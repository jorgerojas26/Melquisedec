import { useState, useEffect, useMemo } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useNotification } from 'hooks/notification';
import { createSale } from 'api/sales';
import { useCurrencyRates } from 'hooks/useCurrencyRates';
import groupBy from 'utils/arrayGroup';

export const useSale = () => {
    const { currencyRates } = useCurrencyRates(false);

    const POS_INITIAL_STATE = useMemo(() => ({ id: new Date().getTime(), name: 'POS', amount: null, isChange: false }), []);
    const INITIAL_CONFIRM_STATE = useMemo(
        () => ({
            message: null,
            actions: [],
            state: null,
            callback: null,
            show: false,
        }),
        []
    );

    const [loading, setLoading] = useState(false);
    const [selectedClient, setSelectedClient] = useLocalStorage('selectedClient', { id: null, cedula: null, phoneNumber: null });
    const [selectedProduct, setSelectedProduct] = useLocalStorage('selectedProduct', null);
    const [selectedDebts, setSelectedDebts] = useLocalStorage('selectedDebts', []);
    const [invoiceProducts, setInvoiceProducts] = useLocalStorage('invoiceProducts', []);
    const [subtotal, setSubtotal] = useLocalStorage('subtotal', 0);
    const [debtTotal, setDebtTotal] = useLocalStorage('debtTotal', 0);
    const [saleTotal, setSaleTotal] = useLocalStorage('saleTotal', 0);
    const [paymentTotal, setPaymentTotal] = useLocalStorage('paymentTotal', {});
    const [paymentInfo, setPaymentInfo] = useLocalStorage('paymentInfo', [POS_INITIAL_STATE]);

    const [confirmState, setConfirmState] = useState(INITIAL_CONFIRM_STATE);

    const { notification, showNotification } = useNotification();

    useEffect(() => {
        if (paymentInfo.length === 0) setPaymentInfo([POS_INITIAL_STATE]);
    }, [paymentInfo.length, setPaymentInfo, POS_INITIAL_STATE]);

    useEffect(() => {
        const subtotal = invoiceProducts.reduce(
            (accumulator, current) => accumulator + (current.converted_price['SYSTEM_USD'] || 0) * current.quantity,
            0
        );
        setSubtotal(subtotal);
    }, [invoiceProducts, setSubtotal]);

    useEffect(() => {
        const dt = selectedDebts.reduce((accumulator, current) => accumulator + (current.debtVES || 0), 0);
        setDebtTotal(dt);
    }, [selectedDebts, setDebtTotal]);

    useEffect(() => {
        setSaleTotal(subtotal + debtTotal);
    }, [subtotal, debtTotal, setSaleTotal]);

    useEffect(() => {
        if (paymentInfo && currencyRates) {
            const paymentsGroupedByName = groupBy(paymentInfo, 'name');

            for (let key of Object.keys(paymentsGroupedByName)) {
                const paymentsInfo = paymentsGroupedByName[key];

                paymentsGroupedByName[key] = paymentsInfo.reduce((accumulator, payment) => {
                    if ((payment.currency && payment.currency === 'VES') || !payment.currency) {
                        accumulator += payment.isChange ? -payment.amount || 0 : payment.amount || 0;
                    } else if (payment.currency && payment.currency === 'USD') {
                        accumulator +=
                            (payment.isChange ? -payment.amount || 0 : payment.amount || 0) * (currencyRates['SYSTEM_USD'].value || 0);
                    }
                    return accumulator;
                }, 0);
            }
            const totalPayment = Object.keys(paymentsGroupedByName).reduce((accumulator, key) => {
                return accumulator + paymentsGroupedByName[key];
            }, 0);

            paymentsGroupedByName['Total'] = totalPayment;

            setPaymentTotal(paymentsGroupedByName);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentInfo, currencyRates]);

    useEffect(() => {
        if (paymentInfo.length === 1 && paymentInfo[0].name === 'POS') {
            const payment = paymentInfo[0];
            payment.amount = saleTotal;
            setPaymentInfo([payment]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saleTotal]);

    const onProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const onProductSubmit = (product) => {
        const products = invoiceProducts.filter((invoiceProduct) => invoiceProduct.id !== product.id);
        setInvoiceProducts([product, ...products]);
        setSelectedProduct(null);
    };

    const onProductDelete = (product) => {
        const products = invoiceProducts.filter((invoiceProduct) => invoiceProduct.id !== product.id);
        setSelectedProduct(null);
        setInvoiceProducts([...products]);
    };

    const onClientSelect = (client, action) => {
        if (action === 'clear') {
            setSelectedClient({ id: null, cedula: null, phoneNumber: null });
            setSelectedDebts([]);
        } else if (action === 'select-option') {
            setSelectedClient({ id: null, cedula: null, phoneNumber: null, ...client });
        }
    };

    const onDebtSelect = (debts) => {
        setSelectedDebts(debts);
    };

    const addPaymentMethod = (name, isChange = false) => {
        const id = paymentInfo.length + new Date().getTime();
        let newPaymentInfo = [];

        if (name === 'POS') {
            newPaymentInfo = [...paymentInfo, { id, name, amount: null, isChange }];
        } else if (name === 'Cash') {
            newPaymentInfo = [...paymentInfo, { id, name, amount: null, currency: 'VES', isChange }];
        } else if (name === 'Transfer') {
            newPaymentInfo = [...paymentInfo, { id, name, amount: null, code: null, bankId: 1, isChange }];
        }
        setPaymentInfo(newPaymentInfo);
    };

    const onPaymentInfoChange = (value, key, id) => {
        const newPaymentInfo = paymentInfo.map((info) => {
            if (info.id === id) {
                info[key] = value;
            }
            return info;
        });
        setPaymentInfo(newPaymentInfo);
    };

    const onPaymentDelete = (id) => {
        const newPaymentInfo = paymentInfo.filter((info) => info.id !== id);
        setPaymentInfo(newPaymentInfo);
    };

    const validateSale = () => {
        if (!invoiceProducts.length) {
            showNotification('error', 'Tabla de productos vacía');
            return false;
        }
        if (!paymentInfo.length || paymentTotal['Total'] <= 0) {
            showNotification('error', 'Información de pago es incorrecta');
            return false;
        }
        return true;
    };

    const paymentValidation = () => {
        const confirmActions = [{ name: 'Guardar Deuda', color: 'orange', callback: () => submitSale(true) }];
        let message = '';

        if (paymentTotal['Total'] < saleTotal) {
            message = 'El pago total es MAYOR al total de la factura. ¿Deseas continuar sin guardar la deuda?';
        } else if (paymentTotal > saleTotal) {
            message = 'El pago total es MENOR al total de la factura. ¿Deseas continuar sin guardar la deuda?';
        }

        if (paymentTotal['Total'] !== saleTotal) {
            setConfirmState({ ...confirmState, actions: confirmActions, message, show: true, callback: submitSale });
        }
    };

    const onSaleSubmit = async (event) => {
        event.preventDefault();

        if (validateSale()) {
            if (!selectedClient.id) {
                setConfirmState({
                    ...confirmState,
                    message: 'No ha seleccionado un cliente, ¿está seguro que desea continuar?',
                    show: true,
                    callback: paymentValidation,
                });
            } else {
                paymentValidation();
            }
        }
    };

    const submitSale = async (saveAsDebt = false) => {
        if (!loading) {
            setLoading(true);
            const response = await createSale({
                clientId: selectedClient.id,
                products: invoiceProducts.map((product) => ({ id: product.id, quantity: product.quantity })),
                paymentInfo,
                status: 1,
                saveAsDebt,
            });
            setLoading(false);

            if (response.status === 200) {
                showNotification('success', 'La venta se ha procesado exitosamente.');
                resetFields();
            } else {
                showNotification(
                    'error',
                    response.data.error.message || response.data.error[0].message || JSON.stringify(response.data.error)
                );
            }
        }
    };

    const resetFields = () => {
        setSelectedClient({ id: null, cedula: null, phoneNumber: null });
        setSelectedDebts([]);
        setSelectedProduct(null);
        setInvoiceProducts([]);
        setSubtotal(0);
        setDebtTotal(0);
        setSaleTotal(0);
        setPaymentTotal(0);
        setPaymentInfo([POS_INITIAL_STATE]);
        setConfirmState(INITIAL_CONFIRM_STATE);
    };

    const onConfirmClose = () => {
        setConfirmState(INITIAL_CONFIRM_STATE);
    };

    return {
        loading,
        selectedClient,
        selectedProduct,
        selectedDebts,
        invoiceProducts,
        subtotal,
        saleTotal,
        debtTotal,
        paymentTotal,
        paymentInfo,
        onProductSelect,
        onProductSubmit,
        onProductDelete,
        onClientSelect,
        onDebtSelect,
        addPaymentMethod,
        onPaymentInfoChange,
        onPaymentDelete,
        onSaleSubmit,
        resetFields,
        submitSale,
        notification,
        confirmState,
        setConfirmState,
        onConfirmClose,
    };
};
