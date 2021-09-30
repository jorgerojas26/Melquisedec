import { useState, useEffect } from 'react';
import SearchInput from 'components/SearchInput';
import { getProductVariants } from 'api/product_variants';

const ProductSearch = ({ hideOutOfStock, innerRef, value, autoFocus = false, isDisabled, onSelect }) => {
    const [selectedProduct, setSelectedProduct] = useState();

    useEffect(() => {
        if (value) {
            setSelectedProduct({ label: value.name, value });
        } else {
            setSelectedProduct(null);
        }
    }, [value]);

    const loadProductVariants = async (inputValue) => {
        let products = await getProductVariants({ page: 0, filter: inputValue });

        if (products && products.records.length > 0) {
            if (hideOutOfStock) products.records = products.records.filter((p) => p.stock > 0);

            const records = products.records.map((record) => {
                const product = {
                    key: record.id,
                    label: record.name,
                    value: record,
                };
                return product;
            });

            return records;
        }
    };

    const handleSelect = (option, { action }) => {
        if (action === 'select-option') {
            setSelectedProduct({ label: option.value.name, value });
            onSelect(option.value, action);
        } else if (action === 'clear') {
            setSelectedProduct(null);
            onSelect(null, action);
        }
    };

    return (
        <SearchInput
            loadOptions={loadProductVariants}
            placeholder='Buscar...'
            value={selectedProduct}
            onSelect={handleSelect}
            autoFocus={autoFocus}
            innerRef={innerRef}
            isDisabled={isDisabled}
            styles={{
                option: (provided, state) => {
                    const stock = state.data.value.stock;
                    const color = stock > 0 ? 'green' : 'red';

                    return {
                        ...provided,
                        color,
                    };
                },
            }}
        />
    );
};

export default ProductSearch;
