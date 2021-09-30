import { useMemo, useState, useEffect } from 'react';

import Table from 'components/Table';
import { usePaginatedResource } from 'hooks/paginatedResource';
import { getSales } from 'api/sales';

import { COLUMNS } from './columns';

const SalesTable = ({ onSaleSelect, selectedRows, shouldRefresh, onError }) => {
    const memoizedColumns = useMemo(() => COLUMNS, []);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);

    const { data, loading, error, fetchResource } = usePaginatedResource({ page, filter, fetching: getSales });

    useEffect(() => {
        if (shouldRefresh) fetchResource();
    }, [shouldRefresh, fetchResource]);

    useEffect(() => {
        if (error) onError(error.message);
    }, [error, onError]);

    return (
        <Table
            loading={loading}
            data={data.records}
            onRowSelect={onSaleSelect}
            selectedRows={selectedRows}
            columns={memoizedColumns}
            filterPlaceholder='Buscar...'
            filter={filter}
            onFilter={setFilter}
            onPaginate={setPage}
            pageCount={data.pageCount}
            capitalize={[1]}
        />
    );
};

export default SalesTable;
