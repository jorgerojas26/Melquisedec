export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Nombre',
        accessor: 'name',
    },
    {
        Header: 'Cédula',
        accessor: 'cedula',
        Cell: ({ value }) => {
            return Number(value).toLocaleString();
        },
    },
    {
        Header: 'Total $',
        accessor: 'total',
        Cell: ({ value }) => {
            return value.toFixed(2);
        },
    },
];
