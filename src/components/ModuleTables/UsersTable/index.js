import { useState, useMemo, useEffect } from 'react';

import Table from 'components/Table';
import { usePaginatedResource } from 'hooks/paginatedResource';
import { getUsers } from 'api/users';

import { COLUMNS } from './columns';

const UsersTable = ({ onUserSelect, selectedRows, shouldRefresh, showNotification }) => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');
    const memoizedColumns = useMemo(() => COLUMNS, []);
    const { data, loading, error, fetchResource } = usePaginatedResource({ page, filter, fetching: getUsers });

    useEffect(() => {
        if (shouldRefresh) fetchResource();
    }, [shouldRefresh, fetchResource]);

    useEffect(() => {
        if (error) showNotification('error', error.message, 3000);
    }, [error, showNotification]);

    return (
        <Table
            selectedRows={selectedRows}
            onRowSelect={onUserSelect}
            loading={loading}
            data={data.records}
            columns={memoizedColumns}
            onFilter={setFilter}
            filterPlaceholder='Buscar...'
            onPaginate={setPage}
            pageCount={data.pageCount}
        />
    );
};

export default UsersTable;
