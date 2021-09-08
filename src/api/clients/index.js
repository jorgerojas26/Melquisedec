import axios from 'axios';

const BASE_URL = '/api/clients';

export const getClients = async ({ page, filter }) => {
    let pageParam = page ? `?page=${page}` : '?';
    let filterParams = filter ? `&filter=${filter}` : '';

    const response = await axios.get(BASE_URL + pageParam + filterParams).catch((error) => error.response);
    return response.data;
};

export const createClient = async (clientData) => {
    const response = await axios.post(BASE_URL, clientData).catch((error) => error.response);
    return response.data;
};

export const updateClient = async (id, clientData) => {
    const response = await axios.patch(BASE_URL + `/${id}`, clientData).catch((error) => error.response);
    return response.data;
};

export const deleteClient = async (id) => {
    const response = await axios.delete(BASE_URL + `/${id}`).catch((error) => error.response);
    return response.data;
};
