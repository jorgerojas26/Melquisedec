import axios from 'axios';

const BASE_URL = '/api/money';

export const getAllMoney = async () => {
    const response = await axios.get(BASE_URL).catch((error) => error.response);
    return response.data;
};

export const getMoneyHistory = async () => {
    const response = await axios.get(BASE_URL + '/history').catch((error) => error.response);
    return response.data;
};

export const createMoney = async (data) => {
    const response = await axios.post(BASE_URL, data).catch((error) => error.response);
    return response.data;
};

export const updateMoney = async (moneyId, data) => {
    const response = await axios.patch(BASE_URL + `/${moneyId}`, data).catch((error) => error.response);
    return response.data;
};
