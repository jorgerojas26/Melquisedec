import formatDate from 'utils/formatDate';

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ value }) => {
            return <button>{value}</button>;
        },
    },
    {
        Header: 'Deuda',
        accessor: 'debtVES',
        Cell: ({ value }) => {
            return value.toLocaleString() + ' Bs';
        },
    },
    {
        Header: 'Creado',
        accessor: 'createdAt',
        Cell: ({ value }) => {
            return formatDate(value);
        },
    },
];
