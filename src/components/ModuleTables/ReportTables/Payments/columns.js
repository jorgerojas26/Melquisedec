export const COLUMNS = [
    {
        Header: 'Método',
        accessor: 'name',
    },
    {
        Header: 'Total',
        accessor: 'amount',
        Cell: ({ value }) => {
            return value ? value.toFixed(2) : 0;
        },
    },
    {
        Header: 'Moneda',
        accessor: 'currency',
    },
];
