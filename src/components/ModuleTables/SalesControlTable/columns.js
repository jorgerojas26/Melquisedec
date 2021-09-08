import NumberFormat from 'react-number-format';

export const COLUMNS = [
    {
        Header: 'Producto',
        accessor: 'name',
        minWidth: 10,
        maxWidth: 20,
        width: 15,
    },
    {
        Header: 'Precio',
        accessor: (row) => {
            return (
                <NumberFormat
                    decimalSeparator=','
                    thousandSeparator='.'
                    suffix=' Bs'
                    displayType='text'
                    value={row.other_currency_prices.VES}
                />
            );
        },
    },
    {
        Header: 'Cantidad',
        accessor: 'quantity',
    },
    {
        Header: 'Total',
        accessor: (row) => {
            return (
                <NumberFormat
                    decimalSeparator=','
                    thousandSeparator='.'
                    suffix=' Bs'
                    displayType='text'
                    value={row.other_currency_prices.VES * row.quantity}
                />
            );
        },
    },
];
