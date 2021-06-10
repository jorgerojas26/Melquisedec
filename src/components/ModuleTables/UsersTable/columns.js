import { DateTime } from 'luxon';

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
        Cell: (props) => {
            return DateTime.fromISO(props.value, { setZone: true }).toFormat('F');
        },
    },
];
