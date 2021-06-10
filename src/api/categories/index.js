import axios from 'axios';

const BASE_URL = '/api/categories';

export const getCategories = async ({ page, filter }) => {
    let pageParam = page ? `?page=${page}` : '';
    let filterParams = filter ? `&filter=${filter}` : '';

    const response = await axios.get(BASE_URL + pageParam + filterParams).catch((error) => error.response);
    return response.data;
};

export const createCategory = async (categoryData) => {
    const response = await axios.post(BASE_URL, categoryData).catch((error) => error.response);
    return response.data;
};

export const updateCategory = async (id, categoryData) => {
    const response = await axios.patch(BASE_URL + `/${id}`, categoryData).catch((error) => error.response);
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await axios.delete(BASE_URL + `/${id}`).catch((error) => error.response);
    return response.data;
};
