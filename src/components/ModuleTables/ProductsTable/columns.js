import getProductName from 'utils/getProductName';
import formatDate from 'utils/formatDate';

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Nombre',
        accessor: (row) => {
            return getProductName(row);
        },
    },
    {
        Header: 'Precio $',
        accessor: 'price',
        id: 'price',
    },
    {
        Header: 'Precio VES',
        accessor: 'converted_price.SYSTEM_USD',
        id: 'converted_price.SYSTEM_USD',
        Cell: (props) => {
            return props.value ? props.value.toLocaleString('es-VE') : '0';
        },
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
        Cell: ({ value }) => {
            return formatDate(value);
        },
    },
];
