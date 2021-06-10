import { useTable } from 'react-table';

import Table from './Table';
import TableFilterInput from 'components/TableFilterInput';
import Pagination from 'components/Pagination';

import debounce from 'lodash.debounce';

const CustomTable = ({
    data = [],
    loading,
    columns = [],
    onRowSelect,
    selectedRowID,
    onFilter,
    filterPlaceholder,
    onPaginate,
    pageCount,
    capitalize,
}) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    const handleClick = (row) => {
        if (selectedRowID === row.id) {
            onRowSelect(null);
        } else {
            onRowSelect(row);
        }
    };

    const onFilterDebounced = debounce((value) => {
        onFilter(value);
    }, 500);

    return (
        <>
            <Table.FilterContainer>
                <TableFilterInput onChange={(event) => onFilterDebounced(event.target.value)} placeholder={filterPlaceholder} autoFocus />
            </Table.FilterContainer>
            <Table.TableContainer>
                <Table {...getTableProps()}>
                    <Table.Head>
                        {headerGroups.map((headerGroup) => (
                            <Table.TR {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <Table.TH {...column.getHeaderProps()}>{column.render('Header')}</Table.TH>
                                ))}
                            </Table.TR>
                        ))}
                    </Table.Head>
                    <Table.Body {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <Table.TR
                                    active={selectedRowID === row.original.id}
                                    {...row.getRowProps({
                                        onClick: () => handleClick(row.original),
                                    })}>
                                    {row.cells.map((cell, index) => {
                                        return (
                                            <Table.TD capitalize={capitalize && capitalize.includes(index)} {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </Table.TD>
                                        );
                                    })}
                                </Table.TR>
                            );
                        })}
                    </Table.Body>
                </Table>
                {data.length > 0 && (
                    <Table.PaginationContainer>
                        <Pagination pageCount={pageCount} onPaginate={onPaginate} />
                    </Table.PaginationContainer>
                )}
            </Table.TableContainer>
            {loading && <Table.LoadingContainer data={data.length ? 1 : 0}>Cargando...</Table.LoadingContainer>}
            {!data.length && !loading && <Table.NoDataContainer>No hay recursos en la base de datos</Table.NoDataContainer>}
        </>
    );
};

export default CustomTable;
