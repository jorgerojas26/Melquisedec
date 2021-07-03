import formatDate from 'utils/formatDate';
import getProductName from 'utils/getProductName';

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
        accessor: (row) => {
            return getProductName(row.product_variant);
        },
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
