import axios from 'axios';

const BASE_URL = '/api/reports';

export const getSalesReport = async ({ from, to }) => {
    let filterParams = from && to ? `?from=${from}&to=${to}` : '';

    const response = await axios.get(BASE_URL + '/sale' + filterParams).catch((error) => error.response);
    return response.data;
};
