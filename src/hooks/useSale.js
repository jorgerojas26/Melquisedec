import { useState, useEffect } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { useNotification } from 'hooks/notification';
import { createSale } from 'api/sales';

export const useSale = () => {
    const initialState = {
        selectedClient: { id: null, cedula: null, phoneNumber: null },
        selectedProduct: null,
        selectedDebts: [],
        invoiceProducts: [],
        totals: { subtotal: 0, total: 0, debtTotal: 0 },
        paymentInfo: [],
    };

    const [saleData, setSaleData] = useLocalStorage('saleData', initialState);
    const [confirmMessage, setConfirmMessage] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const { notification, showNotification } = useNotification();

    useEffect(() => {
        const subtotal = saleData.invoiceProducts.reduce(
            (accumulator, current) => accumulator + current.other_currency_prices.VES * current.quantity,
            0
        );
        const debtTotal = saleData.selectedDebts.reduce((accumulator, current) => accumulator + current.debtVES, 0);

        setSaleData({ ...saleData, totals: { subtotal, debtTotal, total: subtotal + debtTotal } });
    }, [saleData.invoiceProducts, saleData.selectedDebts]);

    const onProductSelect = (product) => {
        setSaleData({ ...saleData, selectedProduct: product });
    };

    const onProductSubmit = (product) => {
        const products = saleData.invoiceProducts.filter((invoiceProduct) => invoiceProduct.id !== product.id);
        setSaleData({ ...saleData, selectedProduct: null, invoiceProducts: [product, ...products] });
    };

    const onProductDelete = (product) => {
        const products = saleData.invoiceProducts.filter((invoiceProduct) => invoiceProduct.id !== product.id);
        setSaleData({ ...saleData, selectedProduct: null, invoiceProducts: [...products] });
    };

    const onClientSelect = (client, action) => {
        if (action === 'clear') {
            setSaleData({
                ...saleData,
                selectedClient: {
                    id: null,
                    cedula: null,
                    phoneNumber: null,
                },
                selectedDebts: [],
            });
        } else if (action === 'select-option') {
            setSaleData({
                ...saleData,
                selectedClient: {
                    id: null,
                    cedula: null,
                    phoneNumber: null,
                    ...client,
                },
            });
        }
    };

    const onDebtSelect = (debts) => {
        setSaleData({ ...saleData, selectedDebts: debts });
    };

    const onSaleSubmit = async (event) => {
        event.preventDefault();

        if (!saleData.invoiceProducts.length) {
            showNotification('error', 'Tabla de productos vacia');
            return;
        }

        if (!saleData.selectedClient.id) {
            setConfirmMessage('No ha seleccionado un cliente, ¿está seguro que desea continuar?');
            setShowConfirmDialog(true);
            return;
        }

        submitSale();
    };

    const submitSale = async () => {
        const response = await createSale({
            clientId: saleData.selectedClient.id,
            products: saleData.invoiceProducts.map((product) => ({ id: product.id, quantity: product.quantity })),
            status: 1,
        });

        if (response.status === 200) {
            showNotification('success', 'La venta se ha procesado exitosamente.');
            resetFields();
            return;
        } else {
            showNotification('error', response.data.error.message);
        }
    };

    const resetFields = () => {
        setSaleData(initialState);
        setShowConfirmDialog(false);
    };

    return {
        saleData,
        onProductSelect,
        onProductSubmit,
        onProductDelete,
        onClientSelect,
        onDebtSelect,
        onSaleSubmit,
        resetFields,
        showConfirmDialog,
        setShowConfirmDialog,
        submitSale,
        notification,
        confirmMessage,
    };
};
