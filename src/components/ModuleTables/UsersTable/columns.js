import formatDate from 'utils/formatDate';

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Nombre de usuario',
        accessor: 'username',
    },
    {
        Header: 'Nivel de permiso',
        accessor: 'permissions',
    },
    {
        Header: 'Creado',
        accessor: 'createdAt',
        Cell: ({ value }) => {
            return formatDate(value);
        },
    },
];
