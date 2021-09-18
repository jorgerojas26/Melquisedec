import { useEffect, useState, useRef } from 'react';
import * as L from './styles';

import Button from 'components/Button';
import ProductSearch from 'components/ProductSearch';
import { getProductVariantById } from 'api/product_variants';
import Notification from 'components/Notification';
import { useNotification } from 'hooks/notification';
import getProductName from 'utils/getProductName';
import { useCurrencyRates } from 'hooks/useCurrencyRates';

const SaleProductForm = ({ productToEdit, productSearchRef, onSubmit }) => {
    const { currencyRates } = useCurrencyRates(false);

    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { notification, showNotification } = useNotification();
    let quantityInputRef = useRef(null);

    useEffect(() => {
        if (productToEdit) {
            setSelectedProduct(productToEdit);
            setQuantity(productToEdit.quantity);
            quantityInputRef.current.focus();
        } else {
            setSelectedProduct(null);
            setQuantity(1);
            productSearchRef.current.focus();
        }
    }, [productToEdit, productSearchRef]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!currencyRates) {
            showNotification('error', 'Debe asignar el valor del dolar');
            return;
        }
        if (!selectedProduct || !quantity) {
            showNotification('error', 'Producto o cantidad vacia');
            return;
        }

        const product = await getProductVariantById(selectedProduct.id);
        const stock = Number(product.stock);

        if (stock < quantity) {
            showNotification('error', `No hay suficiente stock. Queda(n) ${stock} producto(s).`);
            return;
        }

        if (!loading) {
            setLoading(true);
            onSubmit({
                ...product,
                name: getProductName(product),
                price: Number(product.price),
                quantity,
                profitPercent: Number(product.profitPercent),
                stock: Number(product.stock),
            });
            setLoading(false);

            setQuantity(1);
            setSelectedProduct(null);
            productSearchRef.current.focus();
        }
    };

    const onProductSelect = (product, action) => {
        setSelectedProduct(product);
        if (action === 'select-option') quantityInputRef.current.focus();
    };

    return (
        <L.FormContainer onSubmit={handleSubmit}>
            <h4>Producto</h4>
            <h4>Cantidad</h4>
            <label></label>
            <ProductSearch hideOutOfStock innerRef={productSearchRef} value={selectedProduct} onSelect={onProductSelect} autoFocus />
            <L.QuantityInput
                style={{ textAlign: 'center', fontSize: '16px' }}
                onFocus={(event) => {
                    setTimeout(() => event.target.select());
                }}
                getInputRef={(ref) => (quantityInputRef.current = ref)}
                onValueChange={(values) => setQuantity(values.floatValue)}
                value={quantity}
            />
            <Button loading={loading} type='submit'>
                Enviar
            </Button>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </L.FormContainer>
    );
};

export default SaleProductForm;
