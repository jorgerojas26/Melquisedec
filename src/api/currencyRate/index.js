import axios from 'axios';

const BASE_URL = '/api/currencyRates';

export const getCurrencyRate = async (currency) => {
    const response = await axios.get(`${BASE_URL}/${currency}`).catch((error) => error.response);
    return response.data;
};

export const getCurrencyRates = async () => {
    const response = await axios.get(BASE_URL).catch((error) => error.response);
    return response.data;
};

export const updateCurrencyRateRequest = async (data) => {
    const response = await axios.patch(`${BASE_URL}/${data.currency}`, data).catch((error) => error.response);
    return response.data;
};
