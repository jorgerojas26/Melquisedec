import NumericInput from 'react-number-format';
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
        Header: 'RIF',
        accessor: 'rif',
    },
    {
        Header: 'Teléfono',
        accessor: 'phoneNumber',
        Cell: (props) => {
            if (props.value !== '') {
                return <NumericInput displayType='text' value={props.value} format='(####) ###-####' />;
            } else {
                return 'No registrado';
            }
        },
    },
    {
        Header: 'Dirección',
        accessor: 'address',
    },
    {
        Header: 'Creado',
        accessor: 'createdAt',
        Cell: ({ value }) => {
            return formatDate(value);
        },
    },
];
