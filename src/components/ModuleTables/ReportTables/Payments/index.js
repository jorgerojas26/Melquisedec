import { useMemo } from 'react';
import Table from 'components/Table';
import { COLUMNS } from './columns';

const PaymentsReportTable = ({ data, maxHeight }) => {
    const memoizedColumns = useMemo(() => COLUMNS, []);

    return <Table data={data} columns={memoizedColumns} maxHeight={maxHeight} />;
};

export default PaymentsReportTable;
