import axios from 'axios';

const BASE_URL = '/api/supplyings';

export const getSupplyings = async ({ page, filter, count }) => {
    let pageParam = page ? `?page=${page}` : '?';
    let filterParams = filter ? `&filter=${filter}` : '';
    let countParam = count ? `&count=${count}` : '';

    const response = await axios.get(BASE_URL + pageParam + countParam + filterParams).catch((error) => error.response);
    return response.data;
};

export const createSupplying = async (supplyingData) => {
    const response = await axios.post(BASE_URL, supplyingData).catch((error) => error.response);
    console.log(response);
    return response.data;
};

export const updateSupplying = async (id, supplyingData) => {
    const response = await axios.patch(BASE_URL + `/${id}`, supplyingData).catch((error) => error.response);
    return response.data;
};

export const deleteSupplying = async (id) => {
    const response = await axios.delete(BASE_URL + `/${id}`).catch((error) => error.response);
    return response.data;
};
