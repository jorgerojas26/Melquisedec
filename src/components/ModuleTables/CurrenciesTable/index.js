import { useState, useMemo, useEffect } from 'react';

import Table from 'components/Table';
import { COLUMNS } from './columns';

import { usePaginatedResource } from 'hooks/paginatedResource';
import { getCurrencies } from 'api/currencies';

const CurrenciesTable = ({ onCurrencySelect, selectedRows, shouldRefresh, showNotification }) => {
    const [filter, setFilter] = useState('');

    const memoizedColumns = useMemo(() => COLUMNS, []);

    const { data, loading, error, fetchResource } = usePaginatedResource({ filter, fetching: getCurrencies });

    useEffect(() => {
        if (shouldRefresh) fetchResource();
    }, [shouldRefresh, fetchResource]);

    useEffect(() => {
        if (error) showNotification('error', error.message, 3000);
    }, [error, showNotification]);

    return (
        <Table
            selectedRows={selectedRows}
            onRowSelect={onCurrencySelect}
            loading={loading}
            data={data}
            columns={memoizedColumns}
            onFilter={setFilter}
            filterPlaceholder='Buscar por nombre...'
            pageCount={1}
        />
    );
};

export default CurrenciesTable;
