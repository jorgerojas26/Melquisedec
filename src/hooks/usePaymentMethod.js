import { useState, useEffect } from 'react';
import { getPaymentMethods } from 'api/payment_methods';
import mapPaymentMethods from 'utils/mapPaymentMethods';

export const usePaymentMethod = ({ loadOnMount = false }) => {
    const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    useEffect(() => {
        if (loadOnMount) loadPaymentMethods();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadOnMount]);

    const loadPaymentMethods = async () => {
        if (!paymentMethodsLoading) {
            setPaymentMethodsLoading(true);
            const response = await getPaymentMethods({});
            if (response.error) {
                setError(response.error);
            } else {
                const paymentMethods = mapPaymentMethods(response.records);
                setPaymentMethods(paymentMethods);
                if (paymentMethods.length) setSelectedPaymentMethod({ id: paymentMethods[0].id, name: paymentMethods[0].name });
            }
            setPaymentMethodsLoading(false);
        }
    };

    return {
        paymentMethodsLoading,
        setPaymentMethodsLoading,
        paymentMethods,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        loadPaymentMethods,
        error,
    };
};
