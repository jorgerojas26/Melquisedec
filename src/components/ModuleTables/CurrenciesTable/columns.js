export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Moneda',
        accessor: 'currency',
    },
    {
        Header: 'Valor en bolívares',
        accessor: 'value',
        Cell: ({ value }) => {
            return value.toLocaleString();
        },
    },
    {
        Header: 'Redondeo',
        accessor: 'rounding',
        Cell: ({ value }) => {
            return value.toLocaleString();
        },
    },
];
