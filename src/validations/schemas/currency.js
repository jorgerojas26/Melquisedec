import * as yup from 'yup';

const schema = yup.object().shape({
    currency: yup.string(),
    value: yup.number().required('El campo valor es requerido').typeError('El campo valor debe ser numérico'),
    rounding: yup.number().required('El campo redondeo es requerido').typeError('El campo redondeo debe ser numérico'),
});

export default schema;
