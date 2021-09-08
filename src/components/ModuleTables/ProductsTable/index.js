import { useState, useMemo, useEffect } from 'react';

import { usePaginatedResource } from 'hooks/paginatedResource';
import { getProductVariants } from 'api/product_variants';

import Table from 'components/Table';

import { COLUMNS } from './columns.js';

const ProductsTable = ({ onProductSelect, selectedRows, shouldRefresh, showNotification }) => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');

    const { data, loading, error, fetchResource } = usePaginatedResource({ page, filter, fetching: getProductVariants });
    const memoizedColumns = useMemo(() => COLUMNS, []);

    useEffect(() => {
        if (shouldRefresh) fetchResource();
    }, [shouldRefresh, fetchResource]);

    useEffect(() => {
        if (error) showNotification('error', error.message, 3000);
    }, [error, showNotification]);

    return (
        <Table
            selectedRows={selectedRows}
            onRowSelect={onProductSelect}
            loading={loading}
            data={data.records}
            columns={memoizedColumns}
            onFilter={setFilter}
            filterPlaceholder='Buscar por id, nombre, precio'
            onPaginate={setPage}
            pageCount={data.pageCount}
            capitalize={[1, 3]}
        />
    );
};

export default ProductsTable;
