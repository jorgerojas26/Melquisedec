import { useState, useEffect, useMemo } from 'react';

import Table from 'components/Table';

import { getInventory } from 'api/inventory';
import { usePaginatedResource } from 'hooks/paginatedResource';
import columns from './columns';

const InventoryMovesTable = ({ onError = () => {} }) => {
    const memoizedColumns = useMemo(() => columns, []);
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');

    const { data, loading, error, fetchResource } = usePaginatedResource({ page, filter, fetching: getInventory });

    useEffect(() => {
        if (error) onError(error);
    }, [error, onError]);

    return (
        <Table
            loading={loading}
            data={data.records}
            columns={memoizedColumns}
            onPaginate={setPage}
            onFilter={setFilter}
            filterPlaceholder='Buscar por nombre de producto...'
            pageCount={data.pageCount}
            capitalize={[1]}
            filterHeight='30px'
        />
    );
};

export default InventoryMovesTable;
