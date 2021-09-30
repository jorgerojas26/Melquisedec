import { useState, useEffect, useMemo } from 'react';

import Table from 'components/Table';
import formatDate from 'utils/formatDate';

import { getDebts } from 'api/debts';
import { usePaginatedResource } from 'hooks/paginatedResource';

const DebtsTable = ({
    selectedRows,
    onDebtSelect = () => {},
    shouldRefresh = false,
    onShowDetailsClick = () => {},
    onError = () => {},
}) => {
    const memoizedColumns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Cliente',
                accessor: 'sale.client.name',
            },
            {
                Header: 'Deuda Bs',
                accessor: 'converted_amount.PAYMENT_VES',
                Cell: ({ value }) => {
                    return Math.round(value).toLocaleString() + ' Bs';
                },
            },
            {
                Header: 'Creado',
                accessor: 'createdAt',
                Cell: ({ value }) => {
                    return formatDate(value);
                },
            },
        ],
        []
    );

    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState('');

    const { data, loading, error, fetchResource } = usePaginatedResource({ page, filter, fetching: getDebts });

    useEffect(() => {
        if (shouldRefresh) fetchResource();
    }, [shouldRefresh, fetchResource]);

    useEffect(() => {
        if (error) onError(error);
    }, [error, onError]);

    return (
        <>
            <Table
                loading={loading}
                data={data.records}
                selectedRows={selectedRows}
                onRowSelect={onDebtSelect}
                columns={memoizedColumns}
                onPaginate={setPage}
                onFilter={setFilter}
                pageCount={data.pageCount}
            />
        </>
    );
};

export default DebtsTable;
