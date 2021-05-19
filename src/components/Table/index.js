import { useState } from 'react';
import Table from './Table';

export default ({ data = [], loading, columns, onRowSelect }) => {
    const dataKeys = data.length ? Object.keys(data[0]) : [];
    const columnsToRender = columns ? columns : dataKeys;

    const [activeRowID, setActiveRowID] = useState(-1);

    const handleClick = (selectedRow) => {
        console.log('This event listener is being called');
        if (activeRowID === selectedRow.id) {
            setActiveRowID(-1);
            onRowSelect(null);
        } else {
            setActiveRowID(selectedRow.id);
            onRowSelect(selectedRow);
        }
    };

    return (
        <>
            <Table>
                <Table.Head>
                    <Table.TR>
                        {columnsToRender.map((title) => {
                            return <Table.TH>{title}</Table.TH>;
                        })}
                    </Table.TR>
                </Table.Head>
                <Table.Body>
                    {data.map((row) => {
                        return (
                            <Table.TR active={activeRowID === row.id} key={row.id} onClick={() => handleClick(row)}>
                                {dataKeys.map((column) => {
                                    return <Table.TD>{row[column]}</Table.TD>;
                                })}
                            </Table.TR>
                        );
                    })}
                </Table.Body>
            </Table>
            {loading && <Table.LoadingContainer />}
        </>
    );
};
