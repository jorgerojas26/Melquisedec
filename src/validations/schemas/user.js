import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup.string().required('El campo nombre de usuario es requerido'),
    password: yup.string().nullable(true),
    permissions: yup
        .number()
        .required('El campo Nivel de permiso es requerido')
        .min(0, 'El nivel de permiso debe tener un valor entre 0 y 2')
        .max(2, 'El nivel de permiso debe tener un valor entre 0 y 2'),
});

export default schema;
