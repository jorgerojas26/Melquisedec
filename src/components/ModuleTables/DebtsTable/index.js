import { useMemo } from 'react';

import Table from 'components/Table';
import formatDate from 'utils/formatDate';

const DebtsTable = ({ selectedRows, onDebtSelect, onShowDetailsClick, data }) => {
    const memoizedColumns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
                Cell: (props) => {
                    return (
                        <button style={{ cursor: 'pointer' }} onClick={() => onShowDetailsClick(props.row.original)}>
                            {props.value}
                        </button>
                    );
                },
            },
            {
                Header: 'Deuda Bs',
                accessor: 'debt.converted_amount.USD',
                Cell: ({ value }) => {
                    return Math.round(value).toLocaleString() + ' Bs';
                },
            },
            {
                Header: 'Creado',
                accessor: 'createdAt',
                Cell: ({ value }) => {
                    return formatDate(value);
                },
            },
        ],
        [onShowDetailsClick]
    );

    return (
        <>
            <Table
                selectedRows={selectedRows}
                onRowSelect={onDebtSelect}
                data={data}
                columns={memoizedColumns}
                capitalize={[1]}
                async={false}
                multiSelect
            />
        </>
    );
};

export default DebtsTable;
