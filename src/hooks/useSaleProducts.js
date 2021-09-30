import { useState, useEffect } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const useSaleProducts = (persistToLocalStorage = false) => {
    const [invoiceProducts, setInvoiceProducts] = useState([]);
    const [persistedInvoiceProducts, setPersistedInvoiceProducts] = useLocalStorage('invoiceProducts', []);

    const [persistedSubtotal, setPersistedSubtotal] = useLocalStorage('subtotal', 0);
    const [subtotal, setSubtotal] = useState(0);

    const [persistedSaleTotal, setPersistedSaleTotal] = useLocalStorage('saleTotal', 0);
    const [saleTotal, setSaleTotal] = useState(0);

    useEffect(() => {
        const currentProducts = persistToLocalStorage ? persistedInvoiceProducts : invoiceProducts;

        const subtotal = currentProducts.reduce(
            (accumulator, current) => accumulator + (current.converted_price['PRICE_VES'] || 0) * current.quantity,
            0
        );
        if (persistToLocalStorage) {
            setPersistedSubtotal(subtotal);
            setPersistedSaleTotal(subtotal);
        } else {
            setSubtotal(subtotal);
            setSaleTotal(subtotal);
        }
    }, [invoiceProducts, persistToLocalStorage, persistedInvoiceProducts, setPersistedSaleTotal, setPersistedSubtotal]);

    return {
        invoiceProducts,
        setInvoiceProducts,
        persistedInvoiceProducts,
        setPersistedInvoiceProducts,
        subtotal,
        setSubtotal,
        persistedSubtotal,
        setPersistedSubtotal,
        saleTotal,
        setSaleTotal,
        persistedSaleTotal,
        setPersistedSaleTotal,
    };
};
