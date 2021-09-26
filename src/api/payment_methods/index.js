import axios from 'axios';

const BASE_URL = '/api/payment-methods';

export const getPaymentMethods = async ({ page, filter }) => {
    let pageParam = page ? `?page=${page}` : '?';
    let filterParams = filter ? `&filter=${filter}` : '';

    const response = await axios.get(BASE_URL + pageParam + filterParams).catch((error) => error.response);
    return response.data;
};

export const createPaymentMethod = async (paymentMethodData) => {
    const response = await axios.post(BASE_URL, paymentMethodData).catch((error) => error.response);
    return response.data;
};

export const updatePaymentMethod = async (id, paymentMethodData) => {
    const response = await axios.patch(BASE_URL + `/${id}`, paymentMethodData).catch((error) => error.response);
    return response.data;
};

export const deletePaymentMethod = async (id) => {
    const response = await axios.delete(BASE_URL + `/${id}`).catch((error) => error.response);
    return response.data;
};
