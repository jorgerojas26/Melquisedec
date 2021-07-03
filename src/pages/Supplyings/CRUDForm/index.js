import { useEffect, useState } from 'react';

import {
    Form,
    HeaderContainer,
    BodyContainer,
    FooterWrapper,
    FooterContainer,
    InputContainer,
    InlineContainer,
    ButtonContainer,
    CloseButtonContainer,
    TitleContainer,
    ErrorContainer,
    TableContainer,
} from 'components/CommonLayout/form.layout';

import Button from 'components/Button';
import { colors } from 'styles/theme';
import { BookBookmark, XCircle, X } from 'phosphor-react';
import { useForm } from 'hooks/useForm';
import { createSupplying, updateSupplying } from 'api/supplyings';
import NumericInput from 'react-number-format';

import supplyingSchema from 'validations/schemas/supplying';

import SupplierSearch from 'components/SupplierSearch';
import ProductSearch from 'components/ProductSearch';
import LabeledInput from 'components/LabeledInput';
import RecentSupplyingsTable from 'components/ModuleTables/RecentSupplyingsTable';

const SupplyingForm = ({ supplying, action, handleClose, onSubmit }) => {
    const { handleNumericInput, handleSubmit, formData, setFormData, printError, hasError } = useForm({
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
    const [recentSupplyings, setRecentSupplyings] = useState(null);
    const [activeSupplying, setActiveSupplying] = useState(supplying);

    useEffect(() => {
        if (activeSupplying)
            setFormData({
                id: activeSupplying.id,
                supplierId: activeSupplying.supplier.id,
                product_variant_id: activeSupplying.product_variant.id,
                buyPrice: activeSupplying.buyPrice,
                quantity: activeSupplying.quantity,
            });
    }, [activeSupplying, setFormData]);

    useEffect(() => {
        if (recentSupplyings && recentSupplyings.length > 0 && action === 'create') {
            setActiveSupplying(recentSupplyings[0]);
        }
    }, [recentSupplyings]);

    return (
        <Form onSubmit={handleSubmit}>
            <HeaderContainer>
                <CloseButtonContainer>
                    <Button onClick={handleClose}>
                        <X />
                    </Button>
                </CloseButtonContainer>
                <TitleContainer>{action === 'create' ? 'Crear abastecimiento' : 'Editar abastecimiento'}</TitleContainer>
            </HeaderContainer>
            <BodyContainer>
                <InputContainer>
                    <SupplierSearch
                        onSelect={(selectedSupplierId) => setFormData({ ...formData, supplierId: selectedSupplierId })}
                        value={activeSupplying.supplier}
                        autoFocus
                    />
                    {printError('supplierId')}
                </InputContainer>
                <InputContainer>
                    <ProductSearch
                        onSelect={(selectedProductId) => setFormData({ ...formData, product_variant_id: selectedProductId })}
                        value={activeSupplying.product_variant}
                    />
                    {printError('product_variant_id')}
                </InputContainer>
                <InlineContainer>
                    <InputContainer>
                        <LabeledInput
                            onValueChange={({ floatValue }) => handleNumericInput(floatValue, 'buyPrice')}
                            value={formData.buyPrice}
                            placeholder='Precio/Unidad'
                            prefix='$ '
                            as={NumericInput}
                            errorborder={hasError('buyPrice')}
                            required
                        />
                        {printError('buyPrice')}
                    </InputContainer>
                    <InputContainer>
                        <LabeledInput
                            onValueChange={({ floatValue }) => handleNumericInput(floatValue, 'quantity')}
                            value={formData.quantity}
                            placeholder='Cantidad'
                            as={NumericInput}
                            errorborder={hasError('quantity')}
                            required
                        />
                        {printError('quantity')}
                    </InputContainer>
                </InlineContainer>
                {formData.product_variant_id && (
                    <>
                        <TableContainer>
                            <h4>Abastecimientos recientes</h4>
                            <RecentSupplyingsTable product_variant_id={formData.product_variant_id} onLoad={setRecentSupplyings} />
                        </TableContainer>
                    </>
                )}
            </BodyContainer>
            <FooterWrapper>
                <ErrorContainer>{printError('undefined')}</ErrorContainer>
                <FooterContainer>
                    <ButtonContainer color={colors.primary}>
                        <Button type='submit'>
                            <BookBookmark size={24} />
                            Enviar
                        </Button>
                    </ButtonContainer>
                    <ButtonContainer color='red'>
                        <Button onClick={handleClose}>
                            <XCircle size={24} />
                            Cancelar
                        </Button>
                    </ButtonContainer>
                </FooterContainer>
            </FooterWrapper>
        </Form>
    );
};
export default SupplyingForm;
