import { useContext, useEffect, useCallback } from 'react';
import { DolarContext } from 'context/dolar';
import { getCurrencyRate, updateCurrencyRate } from 'api/currencyRate';
import { useNotification } from 'hooks/notification';

export const useDolarValue = (fetchOnMount = true) => {
    const { dolarValue, setDolarValue } = useContext(DolarContext);
    const { notification, showNotification } = useNotification();

    const getDolarFromLocalStorage = () => {
        return window.localStorage.getItem('dolarValue');
    };

    const updateDolarValue = useCallback(
        async (value) => {
            const response = await updateCurrencyRate('VES', {
                currency: 'VES',
                value,
            });
            if (response.error) {
                console.log(response.error);
                showNotification('error', response.error.message);
            } else {
                setDolarValue(parseFloat(response.value));
            }
        },
        [setDolarValue, showNotification]
    );

    const fetchDolarValue = useCallback(async () => {
        const response = await getCurrencyRate('VES');
        if (response.error) {
            showNotification('error', response.error.message);
        } else {
            setDolarValue(parseFloat(response.value));
        }
    }, [setDolarValue, showNotification]);

    useEffect(() => {
        if (fetchOnMount) fetchDolarValue();
    }, [fetchDolarValue, fetchOnMount]);

    return { dolarValue, notification, showNotification, fetchDolarValue, updateDolarValue, getDolarFromLocalStorage };
};
