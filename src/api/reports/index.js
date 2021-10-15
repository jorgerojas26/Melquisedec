import axios from 'axios';

const BASE_URL = '/api/reports';

export const getSalesReport = async ({ from, to }) => {
    let filterParams = from && to ? `?from=${from}&to=${to}` : '';

    const response = await axios.get(BASE_URL + '/sale' + filterParams).catch((error) => error.response);
    return response.data;
};

export const getDailySales = async () => {
    const response = await axios.get(BASE_URL + '/sale/daily-sales/').catch((error) => error.response);
    return response.data;
};

export const getCostFluctuation = async (productId) => {
    const response = await axios.get(BASE_URL + '/product/cost-fluctuation/' + productId).catch((error) => error.response);
    return response.data;
};

export const getProductAverageSales = async (productId) => {
    const response = await axios.get(BASE_URL + '/product/average-sales/' + productId).catch((error) => error.response);
    return response.data;
};
