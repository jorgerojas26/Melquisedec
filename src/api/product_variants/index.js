import axios from 'axios';

const BASE_URL = '/api/product_variants';

export const getProductVariants = async ({ page, filter }) => {
    let pageParam = page ? `?page=${page}` : '';
    let filterParams = filter ? `&filter=${filter}` : '';

    const response = await axios.get(BASE_URL + pageParam + filterParams).catch((error) => error.response);

    return response.data;
};

export const createProductVariant = async (productData) => {
    const response = await axios.post(BASE_URL, productData).catch((error) => error.response);
    return response.data;
};

export const updateProductVariant = async (id, productData) => {
    const response = await axios.patch(BASE_URL + `/${id}`, productData).catch((error) => error.response);

    return response.data;
};

export const deleteProductVariantApi = async (id) => {
    const response = await axios.delete(BASE_URL + `/${id}`).catch((error) => error.response);

    return response.data;
};
