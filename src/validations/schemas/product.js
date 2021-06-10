import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required('El campo nombre es requerido'),
    brand: yup.string(),
    product_variant: yup.array().of(
        yup.object().shape({
            name: yup.string().required('El nombre de la variante es requerido'),
            price: yup.number().required('El precio de la variante es requerido').typeError('El precio de la variante debe ser un número'),
            profitPercent: yup
                .number()
                .required('El % de ganancia de la variante es requerido')
                .typeError('El % de ganancia de la variante debe ser un número'),
            unitValue: yup
                .number()
                .required('El valor unidad de la variante es requerido')
                .typeError('El valor unidad de la variante debe ser un número'),
            imagePath: yup.object().nullable(true),
        })
    ),
});

export default schema;
