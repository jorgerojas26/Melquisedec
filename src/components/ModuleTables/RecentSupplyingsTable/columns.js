import getProductName from 'utils/getProductName';
import formatDate from 'utils/formatDate';

export const COLUMNS = [
    {
        Header: 'Nombre',
        accessor: (row) => {
            return getProductName(row.product_variant);
        },
    },
    {
        Header: '$',
        accessor: 'buyPrice',
    },
    {
        Header: 'Cantidad',
        accessor: 'quantity',
    },
    {
        Header: 'Fecha',
        accessor: 'createdAt',
        Cell: ({ value }) => {
            return <span title={formatDate(value)}>{formatDate(value)}</span>;
        },
    },
];
