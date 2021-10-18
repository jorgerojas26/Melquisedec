import mapPaymentMethods from 'utils/mapPaymentMethods';

const columns = [
    {
        Header: 'Tipo',
        accessor: (row) => {
            const mapped = mapPaymentMethods([row.payment_method]);
            return mapped[0].display_name + ' ' + row.currency;
        },
    },
    {
        Header: 'Total',
        accessor: 'amount',
    },
];

export default columns;
