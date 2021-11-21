import { useMemo } from 'react';
import COLUMNS from './columns';
import { getMoneyHistory } from 'api/money';
import { usePaginatedResource } from 'hooks/paginatedResource';
import Table from 'components/Table';

const MoneyHistoryTable = () => {
    const memoizedColumns = useMemo(() => COLUMNS, []);

    const { data, loading } = usePaginatedResource({ fetching: getMoneyHistory });
    console.log(data);

    return <Table data={data} loading={loading} columns={memoizedColumns} />;
};

export default MoneyHistoryTable;
