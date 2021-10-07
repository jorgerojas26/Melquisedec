import NumberFormat from 'react-number-format';

export const COLUMNS = [
    {
        Header: 'Producto',
        accessor: (row) => {
            return row.name || row.product_variant.name;
        },
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
                    value={row.converted_price.PRICE_VES}
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
                    value={Number((row.converted_price['PRICE_VES'] * row.quantity).toFixed(2))}
                />
            );
        },
    },
];
