import { useMemo } from 'react';

import Table from 'components/Table';

import { COLUMNS } from './columns.js';

const RecentSupplyingsTable = ({ supplyings, loading }) => {
    const memoizedColumns = useMemo(() => COLUMNS, []);

    return <Table loading={loading} data={supplyings} columns={memoizedColumns} capitalize={[0]} />;
};

export default RecentSupplyingsTable;
