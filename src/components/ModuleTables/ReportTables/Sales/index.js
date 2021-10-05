import { useState, useMemo } from 'react';
import Table from 'components/Table';
import { COLUMNS } from './columns';

const SalesReportTable = ({ data, maxHeight }) => {
    const memoizedColumns = useMemo(() => COLUMNS, []);
    const [filteredData, setFilteredData] = useState([]);

    const onFilter = (value) => {
        console.log(value);
        const filtered = data.filter((f) => f.product.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(filtered);
    };

    return (
        <Table
            data={filteredData.length ? filteredData : data}
            columns={memoizedColumns}
            onFilter={onFilter}
            filterPlaceholder='Buscar...'
            filterHeight='30px'
            maxHeight={maxHeight}
            capitalize={[1]}
            showFooter
        />
    );
};

export default SalesReportTable;
