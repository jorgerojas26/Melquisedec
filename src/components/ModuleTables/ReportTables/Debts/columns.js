import formatDate from 'utils/formatDate';

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'saleId',
    },
    {
        Header: 'Nombre',
        accessor: 'name',
    },
    {
        Header: 'Original',
        accessor: 'original_amount',
        Cell: ({ value }) => {
            return value ? value.toFixed(2) : 0;
        },
    },
    {
        Header: 'Actual',
        accessor: 'current_amount',
        Cell: ({ value }) => {
            return value ? value.toFixed(2) : 0;
        },
    },
    {
        Header: 'Creada',
        accessor: 'createdAt',
        Cell: ({ value }) => {
            return formatDate(value);
        },
    },
    {
        Header: 'Pagado',
        accessor: 'paid_date',
        Cell: ({ value }) => {
            return value ? formatDate(value) : 'No pagado';
        },
    },
];
