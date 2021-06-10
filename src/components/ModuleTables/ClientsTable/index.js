import { useState, useMemo, useEffect } from 'react';

import { usePaginatedResource } from 'hooks/paginatedResource';
import { getClients } from 'api/clients';

import Table from 'components/Table';

import { COLUMNS } from './columns.js';

const ClientsTable = ({ onClientSelect, selectedRowID, shouldRefresh, showNotification }) => {
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');

    const { data, loading, error, fetchResource } = usePaginatedResource({ page, filter, fetching: getClients });

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
                onRowSelect={onClientSelect}
                loading={loading}
                data={data.records}
                columns={memoizedColumns}
                onFilter={setFilter}
                filterPlaceholder='Buscar por id, nombre, cédula o teléfono'
                onPaginate={setPage}
                pageCount={data.pageCount}
                capitalize={[1, 3]}
            />
        </>
    );
};

export default ClientsTable;
