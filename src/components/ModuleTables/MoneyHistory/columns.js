import formatDate from 'utils/formatDate';

export default [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Moneda',
        accessor: 'money.currency',
    },
    {
        Header: 'Estaba en',
        accessor: 'old_amount',
    },
    {
        Header: 'Quedó en',
        accessor: 'new_amount',
    },
    {
        Header: 'Comentario',
        accessor: 'reasons',
    },
    {
        Header: 'Fecha',
        accessor: 'createdAt',
        Cell: ({ value }) => {
            return <span title={formatDate(value)}>{formatDate(value)}</span>;
        },
    },
];
