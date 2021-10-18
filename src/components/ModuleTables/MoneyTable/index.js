import { useMemo, useEffect } from 'react';
import COLUMNS from './columns';
import Table from 'components/Table';
import { getAllMoney } from 'api/money';
import { usePaginatedResource } from 'hooks/paginatedResource';
import mapPaymentMethods from 'utils/mapPaymentMethods';

const MoneyTable = ({ onMoneySelect, selectedRows, shouldRefresh, showNotification }) => {
    const memoizedColumns = useMemo(() => COLUMNS, []);

    const { data, loading, error, fetchResource } = usePaginatedResource({ fetching: getAllMoney });

    useEffect(() => {
        if (shouldRefresh) fetchResource();
    }, [shouldRefresh, fetchResource]);

    console.log(data);
    useEffect(() => {
        if (error) showNotification('error', error.message, 3000);
    }, [error, showNotification]);

    return (
        <Table
            data={data}
            loading={loading}
            columns={memoizedColumns}
            capitalize={[0]}
            onRowSelect={onMoneySelect}
            selectedRows={selectedRows}
        />
    );
};

export default MoneyTable;
