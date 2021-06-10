import { useState, useMemo, useEffect } from 'react';

import { usePaginatedResource } from 'hooks/paginatedResource';
import { getCategories } from 'api/categories';

import Table from 'components/Table';

import { COLUMNS } from './columns.js';

const CategoriesTable = ({ onCategorySelect, selectedRowID, shouldRefresh, showNotification }) => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');

    const { data, loading, error, fetchResource } = usePaginatedResource({ page, filter, fetching: getCategories });

    const memoizedColumns = useMemo(() => COLUMNS, []);

    useEffect(() => {
        if (shouldRefresh) fetchResource();
    }, [shouldRefresh, fetchResource]);

    useEffect(() => {
        if (error) showNotification('error', error.message, 3000);
    }, [error, showNotification]);

    return (
        <>
            <Table
                selectedRowID={selectedRowID}
                onRowSelect={onCategorySelect}
                loading={loading}
                data={data.records}
                columns={memoizedColumns}
                onFilter={setFilter}
                filterPlaceholder='Buscar por id o nombre'
                onPaginate={setPage}
                pageCount={data.pageCount}
                capitalize={[1]}
            />
        </>
    );
};

export default CategoriesTable;
