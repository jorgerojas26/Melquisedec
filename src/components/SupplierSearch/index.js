import { useState, useEffect } from 'react';
import SearchInput from 'components/SearchInput';
import { getSuppliers } from 'api/suppliers';

const SupplierSearch = ({ value, autoFocus, onSelect }) => {
    const [selectedSupplier, setSelectedSupplier] = useState();

    useEffect(() => {
        if (value) setSelectedSupplier({ label: value.name, value });
    }, [value]);

    const loadSuppliers = async (inputValue) => {
        const suppliers = await getSuppliers({ page: 0, filter: inputValue });
        if (suppliers && suppliers.records.length > 0) {
            const records = suppliers.records.map((record) => {
                const supplier = {
                    label: record.name,
                    value: record,
                };
                return supplier;
            });

            return records;
        }
    };

    const handleSelect = ({ label, value }) => {
        setSelectedSupplier({ label, value });
        onSelect(value.id);
    };

    return (
        <SearchInput
            loadOptions={loadSuppliers}
            placeholder='Proveedor'
            value={selectedSupplier}
            onSelect={handleSelect}
            autoFocus={autoFocus}
        />
    );
};

export default SupplierSearch;
