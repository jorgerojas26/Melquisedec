import { useState, useEffect } from 'react';
import SearchInput from 'components/SearchInput';
import { getProductVariants } from 'api/product_variants';
import getProductName from 'utils/getProductName';

const ProductSearch = ({ innerRef, value, autoFocus = false, onSelect }) => {
    const [selectedProduct, setSelectedProduct] = useState();

    useEffect(() => {
        if (value) setSelectedProduct({ label: getProductName(value), value });
    }, [value]);

    const loadProductVariants = async (inputValue) => {
        const products = await getProductVariants({ page: 0, filter: inputValue });
        if (products && products.records.length > 0) {
            const records = products.records.map((record) => {
                const product = {
                    label: getProductName(record),
                    value: record,
                };
                return product;
            });

            return records;
        }
    };

    const handleSelect = ({ label, value }) => {
        setSelectedProduct({ label, value });
        onSelect(value.id);
    };

    return (
        <SearchInput
            loadOptions={loadProductVariants}
            placeholder='Producto'
            value={selectedProduct}
            onSelect={handleSelect}
            autoFocus={autoFocus}
            innerRef={innerRef}
        />
    );
};

export default ProductSearch;
