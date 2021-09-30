import formatDate from 'utils/formatDate';

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Cliente',
        accessor: (row) => {
            if (row.client) {
                return (
                    <div>
                        <span>{row.client.name}</span>
                        <span>{Number(row.client.cedula).toLocaleString()}</span>
                    </div>
                );
            } else {
                return 'Anónimo';
            }
        },
    },
    {
        Header: 'Total',
        accessor: 'converted_amount.PAYMENT_VES',
        Cell: ({ value }) => {
            return value.toLocaleString();
        },
    },
    {
        Header: 'Fecha',
        accessor: 'createdAt',
        Cell: ({ value }) => {
            return formatDate(value);
        },
    },
];
