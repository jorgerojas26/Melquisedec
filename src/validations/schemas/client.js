import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('El campo nombre es requerido'),
    cedula: yup.string().min(7, 'Cédula inválida').max(8, 'Cédula inválida').required('El campo cédula es requerido'),
    phoneNumber: yup.string().test('is-invalid', 'El teléfono debe contener 11 caracteres', async (value) => {
        return value.length === 0 || value.length === 11;
    }),
});

export default schema;
