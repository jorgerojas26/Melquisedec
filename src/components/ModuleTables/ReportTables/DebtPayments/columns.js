import formatDate from 'utils/formatDate';

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Cliente',
        accessor: 'name',
    },
    {
        Header: 'Pagado',
        accessor: (row) => {
            return row.currency === 'VES' ? row.amount_VES + ' Bs' : '$' + row.amount_USD;
        },
    },
    {
        Header: 'Fecha',
        accessor: 'createdAt',
        Cell: ({ value }) => {
            return formatDate(value);
        },
        Footer: ({ data }) => {
            let total_USD = data.reduce((acc, product) => {
                return acc + product.amount_USD;
            }, 0);
            let total_VES = data.reduce((acc, product) => {
                return acc + product.amount_VES;
            }, 0);

            return (
                <span>
                    USD: {total_USD.toFixed(2)} - VES: {total_VES.toFixed(2)}
                </span>
            );
        },
    },
];
