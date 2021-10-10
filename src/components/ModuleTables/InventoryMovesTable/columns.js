import formatDate from 'utils/formatDate';

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Producto',
        accessor: 'product_variant.name',
    },
    {
        Header: 'Estaba en',
        accessor: 'old_stock',
    },
    {
        Header: 'Quedó en',
        accessor: 'new_stock',
    },
    {
        Header: 'Razón',
        accessor: 'reasons',
    },
    {
        Header: 'Fecha',
        accessor: 'createdAt',
        Cell: ({ value }) => {
            return formatDate(value);
        },
    },
];

export default columns;
