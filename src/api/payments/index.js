import axios from 'axios';

const BASE_URL = '/api/payments';

export const create_payment_for_sale = async (paymentInfo, saleId) => {
    const response = await axios.post(`${BASE_URL}/sale/${saleId}`, { paymentInfo, saleId }).catch((error) => error.response);
    return response.data;
};
