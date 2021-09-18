import { useEffect, useState, useRef } from 'react';

import * as L from 'components/CommonLayout/form.layout';

import Button from 'components/Button';
import { colors } from 'styles/theme';
import { BookBookmark, XCircle, X } from 'phosphor-react';
import { useForm } from 'hooks/useForm';
import { createSupplying, updateSupplying } from 'api/supplyings';
import { getRecentSupplyings } from 'api/product_variants';
import NumericInput from 'react-number-format';

import supplyingSchema from 'validations/schemas/supplying';

import SupplierSearch from 'components/SupplierSearch';
import ProductSearch from 'components/ProductSearch';
import LabeledInput from 'components/LabeledInput';
import RecentSupplyingsTable from 'components/ModuleTables/RecentSupplyingsTable';

const SupplyingForm = ({ supplying, action, handleClose, onSubmit }) => {
    const { handleNumericInput, loading, handleSubmit, formData, setFormData, printError, hasError } = useForm({
        initialState: {
            supplierId: null,
            product_variant_id: null,
            buyPrice: null,
            quantity: null,
        },
        action,
        createResource: createSupplying,
        editResource: updateSupplying,
        schema: supplyingSchema,
        onSubmitSuccess: onSubmit,
    });
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [loadingRecentSupplyings, setLoadingRecentSupplyings] = useState(false);
    const [recentSupplyings, setRecentSupplyings] = useState(null);
    const [productSearchDisabled, setProductSearchDisabled] = useState(false);

    const supplierRef = useRef(null);
    const productRef = useRef(null);
    const buyPriceRef = useRef(null);
    const quantityRef = useRef(null);

    useEffect(() => {
        if (supplying) {
            fetchRecentSupplyings(supplying.product_variant.id);
            setFormData({
                id: supplying.id,
                supplierId: supplying.supplier.id,
                product_variant_id: supplying.product_variant.id,
                buyPrice: supplying.buyPrice,
                quantity: supplying.quantity,
            });
            setSelectedProduct(supplying.product_variant);
            setSelectedSupplier(supplying.supplier);
        }
    }, [supplying, setFormData]);

    const fetchRecentSupplyings = async (product_variant_id) => {
        setLoadingRecentSupplyings(true);
        setProductSearchDisabled(true);
        const response = await getRecentSupplyings({ page: 1, count: 5, product_variant_id });
        setRecentSupplyings(response.records);
        setLoadingRecentSupplyings(false);
        setProductSearchDisabled(false);
        return response;
    };

    const onProductSelect = async (product) => {
        if (!loadingRecentSupplyings && action === 'create') {
            const response = await fetchRecentSupplyings(product.id);

            if (response && response.records.length > 0) {
                console.log('there are recent supplyings');
                const mostRecentSupplying = response.records[0];
                setFormData({
                    ...formData,
                    product_variant_id: product.id,
                    buyPrice: mostRecentSupplying.buyPrice,
                    quantity: mostRecentSupplying.quantity,
                });
                setTimeout(() => quantityRef.current.focus());
            } else {
                console.log('no records');
                setFormData({
                    ...formData,
                    product_variant_id: product.id,
                    buyPrice: '',
                    quantity: '',
                });
                setTimeout(() => buyPriceRef.current.focus());
            }
            setSelectedProduct(product);
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setTimeout(() => productRef.current.focus());
        handleSubmit(event);
    };

    return (
        <L.Form onSubmit={submitHandler}>
            <L.HeaderContainer>
                <L.CloseButtonContainer>
                    <Button onClick={handleClose}>
                        <X />
                    </Button>
                </L.CloseButtonContainer>
                <L.TitleContainer>{action === 'create' ? 'Crear abastecimiento' : 'Editar abastecimiento'}</L.TitleContainer>
            </L.HeaderContainer>
            <L.BodyContainer>
                <L.InputContainer>
                    <SupplierSearch
                        innerRef={supplierRef}
                        onSelect={(supplier) => {
                            setSelectedSupplier(supplier);
                            setFormData({ ...formData, supplierId: supplier.id });
                            productRef.current.focus();
                        }}
                        value={selectedSupplier}
                        autoFocus
                    />
                    {printError('supplierId')}
                </L.InputContainer>
                <L.InputContainer>
                    <ProductSearch
                        isDisabled={productSearchDisabled}
                        innerRef={productRef}
                        onSelect={onProductSelect}
                        value={selectedProduct}
                    />
                    {printError('product_variant_id')}
                </L.InputContainer>
                <L.InlineContainer>
                    <L.InputContainer>
                        <LabeledInput
                            innerRef={buyPriceRef}
                            onValueChange={({ floatValue }) => handleNumericInput(floatValue, 'buyPrice')}
                            value={formData.buyPrice}
                            placeholder='Precio/Unidad'
                            prefix='$ '
                            as={NumericInput}
                            errorborder={hasError('buyPrice')}
                            required
                        />
                        {printError('buyPrice')}
                    </L.InputContainer>
                    <L.InputContainer>
                        <LabeledInput
                            innerRef={quantityRef}
                            onValueChange={({ floatValue }) => handleNumericInput(floatValue, 'quantity')}
                            value={formData.quantity}
                            placeholder='Cantidad'
                            as={NumericInput}
                            errorborder={hasError('quantity')}
                            required
                        />
                        {printError('quantity')}
                    </L.InputContainer>
                </L.InlineContainer>
                {selectedProduct && (
                    <L.TableContainer>
                        <h4>Abastecimientos recientes</h4>
                        <RecentSupplyingsTable supplyings={recentSupplyings || []} loading={loadingRecentSupplyings} />
                    </L.TableContainer>
                )}
            </L.BodyContainer>
            <L.FooterWrapper>
                <L.ErrorContainer>{printError('undefined')}</L.ErrorContainer>
                <L.FooterContainer>
                    <L.ButtonContainer color={colors.primary}>
                        <Button loading={loading} type='submit'>
                            <BookBookmark size={24} />
                            Enviar
                        </Button>
                    </L.ButtonContainer>
                    <L.ButtonContainer color='red'>
                        <Button onClick={handleClose}>
                            <XCircle size={24} />
                            Cancelar
                        </Button>
                    </L.ButtonContainer>
                </L.FooterContainer>
            </L.FooterWrapper>
        </L.Form>
    );
};
export default SupplyingForm;
