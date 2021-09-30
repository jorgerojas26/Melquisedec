import formatDate from 'utils/formatDate';

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
        Header: 'Precio $',
        accessor: 'price',
        id: 'price',
    },
    {
        Header: 'Precio VES',
        accessor: 'converted_price.PRICE_VES',
        id: 'converted_price.PRICE_VES',
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
