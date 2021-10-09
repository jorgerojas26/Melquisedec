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
                        <span>{row.client.name ? row.client.name : ''}</span>
                        <span>{row.client.cedula ? Number(row.client.cedula).toLocaleString() : ''}</span>
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
            return value ? value.toLocaleString() : value;
        },
    },
    {
        Header: 'Fecha',
        accessor: 'createdAt',
        Cell: ({ value }) => {
            return formatDate(value);
        },
    },
    {
        Header: 'Estado',
        accessor: (row) => {
            return row.status === 0 ? <span style={{ color: 'red' }}>Anulada</span> : <span style={{ color: 'green' }}>Confirmada</span>;
        },
    },
];
