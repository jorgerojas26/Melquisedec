import { useState, useEffect } from 'react';
import { useTable } from 'react-table';

import Table from './Table';
import TableFilterInput from 'components/TableFilterInput';
import Pagination from 'components/Pagination';
import { MinusCircle } from 'phosphor-react';

import debounce from 'lodash.debounce';

const CustomTable = ({
    data = [],
    loading,
    columns = [],
    filterPlaceholder,
    pageCount,
    capitalize,
    async = true,
    theme = 'light',
    onFilter,
    onRowSelect,
    onPaginate,
    onDeleteRow,
    multiSelect,
    selectedRows = [],
    maxHeight,
    filterHeight,
    showFooter = false,
}) => {
    const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } = useTable({ columns, data });
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (selectedRows && selectedRows.length > 0) {
            setSelected(selectedRows);
        } else if (selectedRows === null) {
            setSelected([]);
        }
    }, [selectedRows]);

    const handleClick = (event, row) => {
        if (event.target.tagName !== 'BUTTON') {
            const rowIsAlreadySelected = selected.some((r) => r.id === row.id);

            if (multiSelect) {
                let newSelectedRows = [];

                if (!rowIsAlreadySelected) {
                    newSelectedRows = [...selected, row];
                } else {
                    newSelectedRows = selected.filter((r) => r.id !== row.id);
                }
                setSelected(newSelectedRows);
                onRowSelect(newSelectedRows);
            } else {
                if (!rowIsAlreadySelected) {
                    setSelected([row]);
                    onRowSelect(row);
                } else {
                    setSelected([]);
                    onRowSelect(null);
                }
            }
        }
    };

    const onFilterDebounced = debounce((value) => {
        onFilter(value);
    }, 500);

    return (
        <>
            {onFilter && (
                <Table.FilterContainer filterHeight={filterHeight}>
                    <TableFilterInput
                        onChange={(event) => onFilterDebounced(event.target.value)}
                        placeholder={filterPlaceholder}
                        autoFocus
                    />
                </Table.FilterContainer>
            )}
            <Table.TableContainer maxHeight={maxHeight}>
                <Table {...getTableProps()}>
                    <Table.Head>
                        {headerGroups.map((headerGroup) => (
                            <Table.TR {...headerGroup.getHeaderGroupProps()}>
                                {onDeleteRow && <Table.TH></Table.TH>}
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
                                    theme={theme}
                                    active={selected.some((r) => r.id === row.original.id)}
                                    {...row.getRowProps({
                                        onClick: onRowSelect
                                            ? (event) => {
                                                  handleClick(event, row.original);
                                              }
                                            : null,
                                    })}
                                >
                                    {onDeleteRow && (
                                        <Table.TD>
                                            <button
                                                onClick={() => onDeleteRow(row.original)}
                                                style={{ padding: '5px 10px', background: 'red', cursor: 'pointer', borderRadius: '5px' }}
                                            >
                                                <MinusCircle color='white' />
                                            </button>
                                        </Table.TD>
                                    )}
                                    {row.cells.map((cell, index) => {
                                        return (
                                            <Table.TD
                                                title={cell.value}
                                                capitalize={capitalize && capitalize.includes(index)}
                                                {...cell.getCellProps()}
                                            >
                                                {cell.render('Cell')}
                                            </Table.TD>
                                        );
                                    })}
                                </Table.TR>
                            );
                        })}
                    </Table.Body>
                    {showFooter && (
                        <Table.Foot>
                            {footerGroups.map((group) => (
                                <tr {...group.getFooterGroupProps()}>
                                    {group.headers.map((column) => (
                                        <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                                    ))}
                                </tr>
                            ))}
                        </Table.Foot>
                    )}
                </Table>
            </Table.TableContainer>
            {onPaginate && data.length > 0 && (
                <Table.PaginationContainer>
                    <Pagination pageCount={pageCount} onPaginate={onPaginate} />
                </Table.PaginationContainer>
            )}
            {loading && <Table.LoadingContainer data={data.length ? 1 : 0}>Cargando...</Table.LoadingContainer>}
            {async && !data.length && !loading && <Table.NoDataContainer>No hay recursos en la base de datos</Table.NoDataContainer>}
        </>
    );
};

export default CustomTable;
