import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('El campo nombre es requerido'),
});

export default schema;
