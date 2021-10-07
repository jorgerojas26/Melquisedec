import { useMemo } from 'react';
import Table from 'components/Table';
import { COLUMNS } from './columns';
import { ReportTableContainer } from 'components/CommonLayout/main.layout';

const TopClientsTable = ({ data, loading, maxHeight }) => {
    const memoizedColumns = useMemo(() => COLUMNS, []);

    return (
        <ReportTableContainer>
            <Table data={data} columns={memoizedColumns} maxHeight={maxHeight} loading={loading} />
        </ReportTableContainer>
    );
};

export default TopClientsTable;
