import { useState, useEffect, useCallback } from 'react';
import { usePaymentMethod } from './usePaymentMethod';
import { useCurrencyRates } from 'hooks/useCurrencyRates';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { create_payment_for_sale } from 'api/payments';

import groupBy from 'utils/arrayGroup';

export const usePayment = (defaultPayment, persistToLocalStorage = false) => {
    const { currencyRates } = useCurrencyRates();

    const { paymentMethods, selectedPaymentMethod, setSelectedPaymentMethod } = usePaymentMethod({ loadOnMount: true });

    const [paymentTotal, setPaymentTotal] = useState({});
    const [persistedPaymentTotal, setPersistedPaymentTotal] = useLocalStorage('paymentTotal', {});

    const [persistedPaymentInfo, setPersistedPaymentInfo] = useLocalStorage('paymentInfo', []);
    const [paymentInfo, setPaymentInfo] = useState([]);

    const summarizePaymentInfo = useCallback(
        (paymentInfo) => {
            if (currencyRates) {
                const paymentsGroupedByName = groupBy(paymentInfo, 'name');

                for (let key of Object.keys(paymentsGroupedByName)) {
                    const paymentsInfo = paymentsGroupedByName[key];

                    paymentsGroupedByName[key] = paymentsInfo.reduce((accumulator, payment) => {
                        if ((payment.currency && payment.currency === 'VES') || !payment.currency) {
                            accumulator += payment.isChange ? -payment.amount || 0 : payment.amount || 0;
                        } else if (payment.currency && payment.currency === 'USD') {
                            accumulator +=
                                (payment.isChange ? -payment.amount || 0 : payment.amount || 0) * (currencyRates['PAYMENT_VES'].value || 0);
                        }
                        return accumulator;
                    }, 0);
                }
                const totalPayment = Object.keys(paymentsGroupedByName).reduce((accumulator, key) => {
                    return accumulator + paymentsGroupedByName[key];
                }, 0);

                paymentsGroupedByName['Total'] = totalPayment;
                return paymentsGroupedByName;
            }
        },
        [currencyRates]
    );

    useEffect(() => {
        if (defaultPayment) {
            if (paymentMethods.length > 0) {
                const addDefaultPayment = {
                    id: paymentInfo.length + new Date().getTime(),
                    payment_method_id: paymentMethods.find((p) => p.name === defaultPayment.name).id,
                    name: defaultPayment.name,
                    amount: null,
                    currency: defaultPayment.currency,
                    isChange: false,
                };
                if (persistToLocalStorage) {
                    if (persistedPaymentInfo.length === 0) {
                        setPersistedPaymentInfo([addDefaultPayment]);
                    }
                } else {
                    if (paymentInfo.length === 0) {
                        setPaymentInfo([addDefaultPayment]);
                    }
                }
            }
        }
    }, [defaultPayment, paymentInfo.length, paymentMethods, persistToLocalStorage, persistedPaymentInfo, setPersistedPaymentInfo]);

    useEffect(() => {
        if (persistToLocalStorage) {
            const paymentTotals = summarizePaymentInfo(persistedPaymentInfo);
            setPersistedPaymentTotal(paymentTotals);
        } else {
            const paymentTotals = summarizePaymentInfo(paymentInfo);
            setPaymentTotal(paymentTotals);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentInfo, persistToLocalStorage, persistedPaymentInfo, summarizePaymentInfo]);

    const onPaymentInfoChange = (value, key, id) => {
        let actual_payment_info = persistToLocalStorage ? persistedPaymentInfo : paymentInfo;
        let set_actual_payment_info = persistToLocalStorage ? setPersistedPaymentInfo : setPaymentInfo;

        const newPaymentInfo = actual_payment_info.map((info) => {
            if (info.id === id) {
                info[key] = value;
            }
            return info;
        });
        set_actual_payment_info(newPaymentInfo);
    };

    const onPaymentAdd = (paymentMethod = { id: null, name: null }, isChange = false) => {
        let actual_payment_info = persistToLocalStorage ? persistedPaymentInfo : paymentInfo;
        let set_actual_payment_info = persistToLocalStorage ? setPersistedPaymentInfo : setPaymentInfo;

        const id = actual_payment_info.length + new Date().getTime();
        let newPaymentInfo = [];

        if (paymentMethod.name === 'POS') {
            newPaymentInfo = [
                ...actual_payment_info,
                { id, payment_method_id: Number(paymentMethod.id), name: paymentMethod.name, amount: null, currency: 'VES', isChange },
            ];
        } else if (paymentMethod.name === 'Cash') {
            newPaymentInfo = [
                ...actual_payment_info,
                { id, payment_method_id: paymentMethod.id, name: paymentMethod.name, amount: null, currency: 'VES', isChange },
            ];
        } else if (paymentMethod.name === 'Transfer') {
            newPaymentInfo = [
                ...actual_payment_info,
                {
                    id,
                    payment_method_id: paymentMethod.id,
                    name: paymentMethod.name,
                    amount: null,
                    currency: 'VES',
                    transaction_code: null,
                    bankId: 1,
                    isChange,
                },
            ];
        } else if (paymentMethod.name === 'Paypal') {
            newPaymentInfo = [
                ...actual_payment_info,
                { id, payment_method_id: paymentMethod.id, name: paymentMethod.name, amount: null, currency: 'USD', code: null, isChange },
            ];
        }
        set_actual_payment_info(newPaymentInfo);
    };

    const onPaymentDelete = (id) => {
        let actual_payment_info = persistToLocalStorage ? persistedPaymentInfo : paymentInfo;
        let set_actual_payment_info = persistToLocalStorage ? setPersistedPaymentInfo : setPaymentInfo;

        const newPaymentInfo = actual_payment_info.filter((info) => info.id !== id);
        set_actual_payment_info(newPaymentInfo);
    };

    return {
        paymentTotal,
        setPaymentTotal,
        persistedPaymentTotal,
        setPersistedPaymentTotal,
        paymentInfo,
        setPaymentInfo,
        persistedPaymentInfo,
        setPersistedPaymentInfo,
        onPaymentInfoChange,
        onPaymentAdd,
        onPaymentDelete,
        paymentMethods,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
    };
};
