import { useMemo } from 'react';

import Table from 'components/Table';

import { COLUMNS } from './columns.js';

const DebtsTable = ({ selectedRows, onDebtSelect, data }) => {
    const memoizedColumns = useMemo(() => COLUMNS, []);

    return (
        <Table
            selectedRows={selectedRows}
            onRowSelect={onDebtSelect}
            data={data}
            columns={memoizedColumns}
            capitalize={[1]}
            async={false}
            persistent
            multiSelect
        />
    );
};

export default DebtsTable;
