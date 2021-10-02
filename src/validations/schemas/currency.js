import * as yup from 'yup';

const schema = yup.object().shape({
    currency: yup.string(),
    value: yup.number().required('El campo valor es requerido').typeError('El campo valor debe ser numérico'),
    rounding: yup.number().nullable(true),
});

export default schema;
