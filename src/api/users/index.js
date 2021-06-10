import axios from 'axios';

const BASE_URL = '/api/users';

export const getUsers = async ({ page, filter }) => {
    let pageParam = page ? `?page=${page}` : '';
    let filterParams = filter ? `&filter=${filter}` : '';

    const response = await axios.get(BASE_URL + pageParam + filterParams).catch((error) => error.response);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await axios.post(BASE_URL, userData).catch((error) => error.response);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await axios.patch(BASE_URL + `/${id}`, userData).catch((error) => error.response);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(BASE_URL + `/${id}`).catch((error) => error.response);
    return response.data;
};
