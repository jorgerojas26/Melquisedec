import axios from 'axios';

const BASE_URL = '/api/debts';

export const getDebts = async ({ page, filter }) => {
    let pageParam = page ? `?page=${page}` : '?';
    let filterParams = filter ? `&filter=${filter}` : '';

    const response = await axios.get(BASE_URL + pageParam + filterParams).catch((error) => error.response);
    return response.data;
};

export const createDebt = async (debtData) => {
    const response = await axios.post(BASE_URL, debtData).catch((error) => error.response);
    return response;
};

export const updateDebt = async (id, debtData) => {
    const response = await axios.patch(BASE_URL + `/${id}`, debtData).catch((error) => error.response);
    return response.data;
};

export const deleteDebt = async (id) => {
    const response = await axios.delete(BASE_URL + `/${id}`).catch((error) => error.response);
    return response.data;
};
