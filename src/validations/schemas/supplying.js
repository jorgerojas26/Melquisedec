import * as yup from 'yup';

const schema = yup.object().shape({
    product_variant_id: yup.number().required('El campo product es requerido').typeError('Debe elegir un producto'),
    supplierId: yup.number().required('El campo proveedor es requerido').typeError('Debe elegir un proveedor'),
    buyPrice: yup.number().required('El campo precio de compra es requerido').typeError('El precio de compra debe tener un valor numérico'),
    quantity: yup.number().required('El campo cantidad es requerido').typeError('La cantidad debe tener un valor numérico'),
});

export default schema;
