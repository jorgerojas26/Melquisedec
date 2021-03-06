import { useState, useMemo, useEffect } from 'react';

import Table from 'components/Table';
import { usePaginatedResource } from 'hooks/paginatedResource';
import { getSupplyings } from 'api/supplyings';

import { COLUMNS } from './columns';

const SupplyingsTable = ({ onSupplyingSelect, selectedRows, shouldRefresh, showNotification }) => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');
    const memoizedColumns = useMemo(() => COLUMNS || [], []);
    const { data, loading, error, fetchResource } = usePaginatedResource({ page, filter, fetching: getSupplyings });

    useEffect(() => {
        if (shouldRefresh) fetchResource();
    }, [shouldRefresh, fetchResource]);

    useEffect(() => {
        if (error) showNotification('error', error.message, 3000);
    }, [error, showNotification]);

    return (
        <Table
            selectedRows={selectedRows}
            onRowSelect={onSupplyingSelect}
            loading={loading}
            data={data.records}
            columns={memoizedColumns}
            onFilter={setFilter}
            filterPlaceholder='Buscar por id, proveedor, producto.'
            onPaginate={setPage}
            pageCount={data.pageCount}
            capitalize={[1, 2]}
        />
    );
};

export default SupplyingsTable;
