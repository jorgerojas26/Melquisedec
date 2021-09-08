import { useState, useEffect } from 'react';
import SearchInput from 'components/SearchInput';
import { getProductVariants } from 'api/product_variants';
import getProductName from 'utils/getProductName';

const ProductSearch = ({ innerRef, value, autoFocus = false, isDisabled, onSelect }) => {
    const [selectedProduct, setSelectedProduct] = useState();
    useEffect(() => {
        if (value) {
            setSelectedProduct({ label: getProductName(value), value });
        } else {
            setSelectedProduct(null);
        }
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
                    const stock = Number(state.data.value.stock);
                    const color = stock ? 'green' : 'red';

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
