import * as yup from 'yup';

const schema = yup.object().shape({
    payment_method_id: yup.number().required(),
    amount: yup.number().required('El campo total es requerido'),
    currency: yup.string().required('El campo moneda es requerido'),
});

export default schema;
