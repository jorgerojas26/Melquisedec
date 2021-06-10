import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('El campo nombre es requerido'),
    rif: yup.string().required('El campo RIF es requerido'),
    address: yup.string().required('El campo dirección es requerido'),
    phoneNumber: yup.string().test('is-invalid', 'El teléfono debe contener 11 caracteres', async (value) => {
        return value.length === 0 || value.length === 11;
    }),
});

export default schema;
