export const COLUMNS = [
    {
        Header: 'Producto',
        accessor: 'product',
    },
    {
        Header: 'Cantidad',
        accessor: 'quantity',
    },
    {
        Header: 'Bruto $',
        accessor: 'rawProfitUSD',
        Cell: ({ value }) => {
            return value ? '$' + value.toFixed(2) : 0;
        },
        Footer: ({ data }) => {
            let total = data.reduce((acc, product) => {
                return acc + product.rawProfitUSD;
            }, 0);

            return '$' + total.toFixed(2);
        },
    },
    {
        Header: 'Neto $',
        accessor: 'netProfitUSD',
        Cell: ({ value }) => {
            return value ? '$' + value.toFixed(4) : 0;
        },
        Footer: ({ data }) => {
            let total = data.reduce((acc, product) => {
                return acc + product.netProfitUSD;
            }, 0);

            return '$' + total.toFixed(2);
        },
    },
    {
        Header: 'Bruto Bs',
        accessor: 'rawProfitVES',
        Cell: ({ value }) => {
            return value ? value.toFixed(2) + ' Bs' : 0;
        },
        Footer: ({ data }) => {
            let total = data.reduce((acc, product) => {
                return acc + product.rawProfitVES;
            }, 0);

            return total.toFixed(2) + ' Bs';
        },
    },
    {
        Header: 'Neto Bs',
        accessor: 'netProfitVES',
        Cell: ({ value }) => {
            return value ? value.toFixed(2) + ' Bs' : 0;
        },
        Footer: ({ data }) => {
            let total = data.reduce((acc, product) => {
                return acc + product.netProfitVES;
            }, 0);

            return total.toFixed(2) + ' Bs';
        },
    },
];
