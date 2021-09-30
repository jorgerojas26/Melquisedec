import formatDate from 'utils/formatDate';

export const COLUMNS = [
    {
        Header: 'Nombre',
        accessor: 'product_variant.name',
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
