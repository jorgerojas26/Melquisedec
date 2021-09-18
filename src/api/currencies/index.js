import axios from 'axios';

const BASE_URL = '/api/currencyRates';

export const getCurrencies = async ({ page, filter }) => {
    let pageParam = page ? `?page=${page}` : '?';
    let filterParams = filter ? `&filter=${filter}` : '';

    const response = await axios.get(BASE_URL + pageParam + filterParams).catch((error) => error.response);
    if (response.data) {
        const currency_array = Object.entries(response.data).reduce(
            (prev, current) => [
                { id: current[1].id, currency: current[0], value: current[1].value, rounding: current[1].rounding },
                ...prev,
            ],
            []
        );
        return currency_array;
    }
    return response.data;
};

export const createCurrency = async (currencyData) => {
    const response = await axios.post(BASE_URL, currencyData).catch((error) => error.response);
    return response.data;
};

export const updateCurrency = async (id, currencyData) => {
    const response = await axios.patch(BASE_URL + `/${id}`, currencyData).catch((error) => error.response);
    return response.data;
};

export const deleteCurrency = async (id) => {
    const response = await axios.delete(BASE_URL + `/${id}`).catch((error) => error.response);
    return response.data;
};
