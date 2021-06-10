import NumericInput from 'react-number-format';
import { DateTime } from 'luxon';

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
        Header: 'Cédula',
        accessor: 'cedula',
        Cell: (props) => {
            return props.value.toLocaleString('es-VE');
        },
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
        Header: 'Creado',
        accessor: 'createdAt',
        Cell: (props) => {
            return DateTime.fromISO(props.value, { setZone: true }).toFormat('F');
        },
    },
];
