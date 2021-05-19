import { useState, useEffect } from 'react';

export const useTableFilter = (rows, pattern, columnIndexes = [0]) => {
    const [filteredRows, setFilteredRows] = useState([]);

    useEffect(() => {
        let filteredData = rows.filter((row) => {
            let keys = Object.keys(row);

            for (let index in columnIndexes) {
                if (row[keys[index]].toLowerCase().includes(pattern.toLowerCase()))
                    return true;
            }

            return false;
        });
        setFilteredRows(filteredData);
    }, [rows, pattern]);

    return filteredRows;
};
