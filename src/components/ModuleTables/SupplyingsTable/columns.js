import formatDate from 'utils/formatDate';

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Proveedor',
        accessor: 'supplier.name',
    },
    {
        Header: 'Producto',
        accessor: 'product_variant.name',
    },
    {
        Header: 'Precio',
        accessor: 'buyPrice',
        Cell: ({ value }) => {
            return `$${value}`;
        },
    },
    {
        Header: 'Cantidad',
        accessor: 'quantity',
    },
    {
        Header: 'Creado',
        accessor: 'createdAt',
        Cell: ({ value }) => {
            return formatDate(value);
        },
    },
];
