import { useState, useEffect } from 'react';

import { useNotification } from 'hooks/notification';
import { usePayment } from './usePayment';
import { useSaleProducts } from 'hooks/useSaleProducts';

import { createSale } from 'api/sales';
import { useConfirm } from './useConfirm';

export const useSale = ({ onSubmitSuccess = () => {} }) => {
    const [loading, setLoading] = useState(false);

    const [selectedClient, setSelectedClient] = useState({ id: null, cedula: null, phoneNumber: null });
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [selectedDebts, setSelectedDebts] = useState([]);
    const [debtTotal, setDebtTotal] = useState(0);

    const { invoiceProducts, setInvoiceProducts, subtotal, setSubtotal, saleTotal, setSaleTotal } = useSaleProducts();

    const {
        paymentMethods,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        paymentTotal,
        setPaymentTotal,
        paymentInfo,
        setPaymentInfo,
        onPaymentInfoChange,
        onPaymentAdd,
        onPaymentDelete,
    } = usePayment({ name: 'POS', currency: 'VES' });

    const { confirmState, setConfirmState, INITIAL_CONFIRM_STATE } = useConfirm();

    const { notification, showNotification } = useNotification();

    useEffect(() => {
        const dt = selectedDebts.reduce((accumulator, current) => accumulator + (current.debt.converted_amount['PAYMENT_VES'] || 0), 0);
        setDebtTotal(dt);
        setSaleTotal(subtotal + dt);
    }, [selectedDebts, setDebtTotal, setSaleTotal, subtotal]);

    useEffect(() => {
        setSaleTotal(subtotal + debtTotal);
    }, [subtotal, setSaleTotal, debtTotal]);

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

    const validateSale = () => {
        if (!invoiceProducts.length) {
            showNotification('error', 'Tabla de productos vacía');
            return false;
        }
        if (!paymentInfo.length || paymentTotal['Total'] < 0) {
            showNotification('error', 'Información de pago es incorrecta');
            return false;
        }
        return true;
    };

    const paymentValidation = () => {
        const confirmActions = [{ name: 'Guardar Deuda', color: 'orange', callback: () => submitSale(true) }];
        let message = '';

        if (paymentTotal['Total'] < saleTotal) {
            message = 'El pago total es MENOR al total de la factura. ¿Deseas continuar sin guardar la deuda?';
        } else if (paymentTotal['Total'] > saleTotal) {
            message = 'El pago total es MAYOR al total de la factura. ¿Deseas continuar sin guardar la deuda?';
        }

        if (paymentTotal['Total'] !== saleTotal) {
            setConfirmState({ ...confirmState, actions: confirmActions, message, show: true, callback: () => submitSale() });
        } else {
            submitSale();
        }
    };

    const onSaveDebtHandler = () => {
        if (validateSale()) {
            setConfirmState({
                ...confirmState,
                message: '¿Está seguro que desea guardar la venta como una DEUDA?',
                show: true,
                callback: () => submitSale(true, true),
            });
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

    const submitSale = async (saveAsDebt = false, fullDebt = false) => {
        if (!loading) {
            try {
                setLoading(true);
                const response = await createSale({
                    clientId: selectedClient.id,
                    products: invoiceProducts.map((product) => ({ id: product.id, quantity: product.quantity })),
                    paymentInfo: fullDebt ? [] : paymentInfo,
                    status: 1,
                    saveAsDebt,
                    //paying_debts: selectedDebts.map((debt) => debt.id),
                });
                setLoading(false);

                if (response.status === 200) {
                    showNotification('success', 'La venta se ha procesado exitosamente.');
                    resetFields();
                    onSubmitSuccess();
                } else {
                    showNotification(
                        'error',
                        response.data.error.message || response.data.error[0].message || JSON.stringify(response.data.error)
                    );
                }
            } catch (error) {
                console.error(error);
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
        setPaymentInfo([]);
        setConfirmState(INITIAL_CONFIRM_STATE);
    };

    const onConfirmClose = () => {
        setConfirmState(INITIAL_CONFIRM_STATE);
    };

    return {
        loading,
        paymentMethods,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        selectedClient,
        setSelectedClient,
        selectedProduct,
        selectedDebts,
        invoiceProducts,
        setInvoiceProducts,
        subtotal,
        saleTotal,
        debtTotal,
        paymentTotal,
        paymentInfo,
        setPaymentInfo,
        onProductSelect,
        onProductSubmit,
        onProductDelete,
        onClientSelect,
        onDebtSelect,
        onPaymentAdd,
        onPaymentInfoChange,
        onPaymentDelete,
        onSaleSubmit,
        onSaveDebtHandler,
        resetFields,
        notification,
        showNotification,
        confirmState,
        onConfirmClose,
    };
};
