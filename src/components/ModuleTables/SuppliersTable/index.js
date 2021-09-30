import { useState, useMemo, useEffect } from 'react';

import Table from 'components/Table';
import { usePaginatedResource } from 'hooks/paginatedResource';
import { getSuppliers } from 'api/suppliers';

import { COLUMNS } from './columns';

const SuppliersTable = ({ onSupplierSelect, selectedRows, shouldRefresh, showNotification }) => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');
    const memoizedColumns = useMemo(() => COLUMNS, []);

    const { data, loading, error, fetchResource } = usePaginatedResource({ page, filter, fetching: getSuppliers });
    useEffect(() => {
        if (shouldRefresh) fetchResource();
    }, [shouldRefresh, fetchResource]);

    useEffect(() => {
        if (error) showNotification('error', error.message, 3000);
    }, [error, showNotification]);

    return (
        <>
            <Table
                selectedRows={selectedRows}
                onRowSelect={onSupplierSelect}
                loading={loading}
                data={data.records}
                columns={memoizedColumns}
                onFilter={setFilter}
                filterPlaceholder='Buscar...'
                onPaginate={setPage}
                pageCount={data.pageCount}
                capitalize={[1, 3]}
            />
        </>
    );
};

export default SuppliersTable;
