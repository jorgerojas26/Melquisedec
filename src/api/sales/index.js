import axios from 'axios';

const BASE_URL = '/api/sales';

export const getSales = async ({ page, filter }) => {
    let pageParam = page ? `?page=${page}` : '?';
    let filterParams = filter ? `&filter=${filter}` : '';

    const response = await axios.get(BASE_URL + pageParam + filterParams).catch((error) => error.response);
    return response.data;
};

export const createSale = async (saleData) => {
    const response = await axios.post(BASE_URL, saleData).catch((error) => error.response);
    console.log(response);
    return response;
};

export const updateSale = async (id, saleData) => {
    const response = await axios.patch(BASE_URL + `/${id}`, saleData).catch((error) => error.response);
    return response.data;
};

export const deleteSale = async (id) => {
    const response = await axios.delete(BASE_URL + `/${id}`).catch((error) => error.response);
    return response.data;
};
