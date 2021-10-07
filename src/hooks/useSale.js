import { useState, useEffect } from 'react';

import { useLocalStorage } from 'hooks/useLocalStorage';
import { useNotification } from 'hooks/notification';
import { usePayment } from './usePayment';
import { useSaleProducts } from 'hooks/useSaleProducts';

import { createSale } from 'api/sales';
import { useConfirm } from './useConfirm';

export const useSale = () => {
    const [loading, setLoading] = useState(false);

    const [selectedClient, setSelectedClient] = useLocalStorage('selectedClient', { id: null, cedula: null, phoneNumber: null });
    const [selectedProduct, setSelectedProduct] = useLocalStorage('selectedProduct', null);

    const [selectedDebts, setSelectedDebts] = useLocalStorage('selectedDebts', []);
    const [debtTotal, setDebtTotal] = useLocalStorage('debtTotal', 0);

    const {
        persistedInvoiceProducts,
        setPersistedInvoiceProducts,
        persistedSubtotal,
        setPersistedSubtotal,
        persistedSaleTotal,
        setPersistedSaleTotal,
    } = useSaleProducts(true);

    const {
        paymentMethods,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        persistedPaymentTotal,
        setPersistedPaymentTotal,
        persistedPaymentInfo,
        setPersistedPaymentInfo,
        onPaymentInfoChange,
        onPaymentAdd,
        onPaymentDelete,
    } = usePayment({ name: 'POS', currency: 'VES' }, true);

    const { confirmState, setConfirmState, INITIAL_CONFIRM_STATE } = useConfirm();

    const { notification, showNotification } = useNotification();

    useEffect(() => {
        const dt = selectedDebts.reduce((accumulator, current) => accumulator + (current.debt.converted_amount['PAYMENT_VES'] || 0), 0);
        setDebtTotal(dt);
        setPersistedSaleTotal(persistedSubtotal + dt);
    }, [selectedDebts, setDebtTotal, setPersistedSaleTotal, persistedSubtotal]);

    useEffect(() => {
        setPersistedSaleTotal(persistedSubtotal + debtTotal);
    }, [persistedSubtotal, setPersistedSaleTotal, debtTotal]);

    useEffect(() => {
        if (persistedPaymentInfo.length === 1 && persistedPaymentInfo[0].name === 'POS') {
            const payment = persistedPaymentInfo[0];
            payment.amount = persistedSaleTotal;
            setPersistedPaymentInfo([payment]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [persistedSaleTotal]);

    const onProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const onProductSubmit = (product) => {
        const products = persistedInvoiceProducts.filter((invoiceProduct) => invoiceProduct.id !== product.id);
        setPersistedInvoiceProducts([product, ...products]);
        setSelectedProduct(null);
    };

    const onProductDelete = (product) => {
        const products = persistedInvoiceProducts.filter((invoiceProduct) => invoiceProduct.id !== product.id);
        setSelectedProduct(null);
        setPersistedInvoiceProducts([...products]);
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
        if (!persistedInvoiceProducts.length) {
            showNotification('error', 'Tabla de productos vacía');
            return false;
        }
        if (!persistedPaymentInfo.length || persistedPaymentTotal['Total'] < 0) {
            showNotification('error', 'Información de pago es incorrecta');
            return false;
        }
        return true;
    };

    const paymentValidation = () => {
        const confirmActions = [{ name: 'Guardar Deuda', color: 'orange', callback: () => submitSale(true) }];
        let message = '';

        if (persistedPaymentTotal['Total'] < persistedSaleTotal) {
            message = 'El pago total es MENOR al total de la factura. ¿Deseas continuar sin guardar la deuda?';
        } else if (persistedPaymentTotal['Total'] > persistedSaleTotal) {
            message = 'El pago total es MAYOR al total de la factura. ¿Deseas continuar sin guardar la deuda?';
        }

        if (persistedPaymentTotal['Total'] !== persistedSaleTotal) {
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
            console.log(selectedDebts);
            try {
                setLoading(true);
                const response = await createSale({
                    clientId: selectedClient.id,
                    products: persistedInvoiceProducts.map((product) => ({ id: product.id, quantity: product.quantity })),
                    paymentInfo: fullDebt ? [] : persistedPaymentInfo,
                    status: 1,
                    saveAsDebt,
                    //paying_debts: selectedDebts.map((debt) => debt.id),
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
            } catch (error) {
                console.error(error);
            }
        }
    };

    const resetFields = () => {
        setSelectedClient({ id: null, cedula: null, phoneNumber: null });
        setSelectedDebts([]);
        setSelectedProduct(null);
        setPersistedInvoiceProducts([]);
        setPersistedSubtotal(0);
        setDebtTotal(0);
        setPersistedSaleTotal(0);
        setPersistedPaymentTotal(0);
        setPersistedPaymentInfo([]);
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
        invoiceProducts: persistedInvoiceProducts,
        setInvoiceProducts: setPersistedInvoiceProducts,
        subtotal: persistedSubtotal,
        saleTotal: persistedSaleTotal,
        debtTotal,
        persistedPaymentTotal,
        persistedPaymentInfo,
        setPersistedPaymentInfo,
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
