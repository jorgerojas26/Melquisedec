import axios from "axios";

const BASE_URL = "/api/currencyRates";

export const getCurrencyRate = async (currency) => {
    const response = await axios.get(`${BASE_URL}/${currency}`).catch((error) => error.response);
    return response.data;
};

export const updateCurrencyRate = async (currency, data) => {
    const response = await axios.patch(`${BASE_URL}/${currency}`, data).catch((error) => error.response);
    return response.data;
};
