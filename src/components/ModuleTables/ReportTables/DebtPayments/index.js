import { useMemo } from 'react';
import Table from 'components/Table';
import { COLUMNS } from './columns';

const DebtPaymentsTable = ({ data, maxHeight }) => {
    const memoizedColumns = useMemo(() => COLUMNS, []);
    return <Table data={data} columns={memoizedColumns} maxHeight={maxHeight} showFooter />;
};

export default DebtPaymentsTable;
