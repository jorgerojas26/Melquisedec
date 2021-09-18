import { useContext, useEffect, useCallback } from 'react';
import { DolarContext } from 'context/dolar';
import { getCurrencyRates, updateCurrencyRateRequest } from 'api/currencyRate';
import { useNotification } from 'hooks/notification';

export const useCurrencyRates = (fetchOnMount = false) => {
    const { currencyRates, setCurrencyRates } = useContext(DolarContext);
    const { notification, showNotification } = useNotification();

    const getCurrencyRatesFromLocalStorage = () => {
        return window.localStorage.getItem('dolarValue');
    };

    const updateCurrencyRate = useCallback(
        async (data) => {
            const response = await updateCurrencyRateRequest(data);
            if (response.error) {
                showNotification('error', response.error.message);
            } else {
                setCurrencyRates(response);
            }
        },
        [setCurrencyRates, showNotification]
    );

    const fetchCurrencyRates = useCallback(async () => {
        const response = await getCurrencyRates();
        if (response.error) {
            showNotification('error', response.error.message);
        } else {
            setCurrencyRates(response);
        }
    }, [setCurrencyRates, showNotification]);

    useEffect(() => {
        if (fetchOnMount) fetchCurrencyRates();
    }, [fetchCurrencyRates, fetchOnMount]);

    return { currencyRates, notification, showNotification, fetchCurrencyRates, updateCurrencyRate, getCurrencyRatesFromLocalStorage };
};
