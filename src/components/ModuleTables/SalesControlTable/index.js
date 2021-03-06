import { useMemo } from 'react';

import Table from 'components/Table';

import { COLUMNS } from './columns.js';

const SalesControlTable = ({ onDeleteRow, onProductSelect, selectedRows, onFilter, maxHeight, products = [] }) => {
    const memoizedColumns = useMemo(() => COLUMNS, []);

    return (
        <Table
            onRowSelect={onProductSelect}
            selectedRows={selectedRows}
            async={false}
            data={products}
            columns={memoizedColumns}
            capitalize={[0]}
            theme='dark'
            onDeleteRow={onDeleteRow}
            onFilter={onFilter}
            filterPlaceholder='Buscar...'
            maxHeight={maxHeight}
        />
    );
};

export default SalesControlTable;
