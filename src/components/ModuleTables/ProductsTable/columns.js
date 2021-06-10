import { DateTime } from 'luxon';

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Nombre',
        accessor: (row) => {
            return row.product.name + ' ' + row.name;
        },
    },
    {
        Header: 'Precio $',
        accessor: 'price',
        id: 'price',
    },
    {
        Header: '% Ganancia',
        accessor: 'profitPercent',
    },
    {
        Header: 'Valor Unidad',
        accessor: 'unitValue',
    },
    {
        Header: 'Stock',
        accessor: 'stock',
    },
    {
        Header: 'Creado',
        accessor: 'createdAt',
        Cell: (props) => {
            return DateTime.fromISO(props.value, { setZone: true }).toFormat('F');
        },
    },
];
