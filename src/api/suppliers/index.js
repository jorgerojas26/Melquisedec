import axios from 'axios';

const BASE_URL = '/api/suppliers';

export const getSuppliers = async ({ page, filter }) => {
    let pageParam = page ? `?page=${page}` : '';
    let filterParams = filter ? `&filter=${filter}` : '';

    const response = await axios.get(BASE_URL + pageParam + filterParams).catch((error) => error.response);
    return response.data;
};

export const createSupplier = async (supplierData) => {
    const response = await axios.post(BASE_URL, supplierData).catch((error) => error.response);
    console.log(response);
    return response.data;
};

export const updateSupplier = async (id, supplierData) => {
    const response = await axios.patch(BASE_URL + `/${id}`, supplierData).catch((error) => error.response);
    return response.data;
};

export const deleteSupplier = async (id) => {
    const response = await axios.delete(BASE_URL + `/${id}`).catch((error) => error.response);
    return response.data;
};
