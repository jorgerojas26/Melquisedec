import { useState, useEffect } from 'react';

import { StockInfo, TotalStock, FreeStock, Header, Variants, VariantContainer, Label } from './styles';

import {
    Form,
    CloseButtonContainer,
    TitleContainer,
    HeaderContainer,
    BodyContainer,
    FooterWrapper,
    FooterContainer,
    ButtonContainer,
    ErrorContainer,
} from 'components/CommonLayout/form.layout';

import Button from 'components/Button';
import { X, BookBookmark, XCircle } from 'phosphor-react';
import { colors } from 'styles/theme';
import { useForm } from 'hooks/useForm';
import { updateProduct } from 'api/products';
import productSchema from 'validations/schemas/product';
import NumberInput from 'components/NumberInput';
import { releaseOrAssign } from 'utils/stockManipulation';

const StockForm = ({ product, handleClose, onSubmit }) => {
    const [freeStock, setFreeStock] = useState(0);
    const [stockTotal, setStockTotal] = useState(0);

    const { formData, handleChange, handleNestedChange, handleSubmit, submitErrors, setSubmitErrors, printError } = useForm({
        initialState: {
            product_variant: [],
            reasons: '',
            ...product,
        },
        action: 'edit',
        editResource: updateProduct,
        schema: productSchema,
        onSubmitSuccess: onSubmit,
    });

    useEffect(() => {
        if (product) {
            const total = product.product_variant.reduce((old, current) => old + current.stock * current.unitValue, 0);
            setStockTotal(total);
        }
    }, [product]);

    const onChangeHandler = (selector, index, key, value) => {
        value = parseFloat(value);

        if (isNaN(value)) {
            value = 0;
        }
        const product = formData.product_variant[index];
        const currentStock = product.stock;
        const unitValue = product.unitValue;

        const { newFreeStock, newProductStock } = releaseOrAssign({ freeStock, currentStock, unitValue, value });
        setFreeStock(newFreeStock);
        handleNestedChange(selector, index, key, newProductStock);
    };

    const ctrlClickHandler = (selector, index, key, action) => {
        const product = formData.product_variant[index];
        const currentStock = product.stock;
        const unitValue = product.unitValue;
        let stockToAsign = 0;

        if (action === 'plus') {
            stockToAsign = Math.floor(freeStock / Number(product.unitValue)) + Number(product.stock);
        }
        const { newFreeStock, newProductStock } = releaseOrAssign({
            freeStock,
            currentStock,
            unitValue,
            value: stockToAsign,
        });

        handleNestedChange(selector, index, key, newProductStock);
        setFreeStock(newFreeStock);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (freeStock > 0 && formData.reasons.trim().length === 0) {
            setSubmitErrors({
                ...submitErrors,
                reasons: 'Debe proveer las razones del cambio arbitrario del stock',
            });
        } else {
            handleSubmit(event);
        }
    };

    return (
        <Form onSubmit={submitHandler}>
            <HeaderContainer>
                <CloseButtonContainer>
                    <Button onClick={handleClose}>
                        <X />
                    </Button>
                </CloseButtonContainer>
                <TitleContainer>Reasignar stock</TitleContainer>
            </HeaderContainer>
            <BodyContainer>
                <Variants>
                    <StockInfo>
                        <TotalStock>{`Stock total: ${stockTotal} unidades`}</TotalStock>
                        <FreeStock>
                            {'Stock liberado: '}
                            <span>{`${freeStock.toFixed(4)} `}</span>
                            unidades
                        </FreeStock>
                    </StockInfo>
                    <Header>
                        <strong>Nombre</strong>
                        <strong>Stock</strong>
                    </Header>
                    {formData &&
                        formData.product_variant.map((productVariant, index) => {
                            return (
                                <VariantContainer key={productVariant.id}>
                                    <Label>{product.name + ' ' + productVariant.name}</Label>
                                    <NumberInput
                                        value={formData['product_variant'][index].stock}
                                        onChange={(value) => onChangeHandler('product_variant', index, 'stock', value)}
                                        onCtrlClick={(action) => ctrlClickHandler('product_variant', index, 'stock', action)}
                                    />
                                </VariantContainer>
                            );
                        })}
                </Variants>
                {freeStock > 0 && (
                    <div>
                        <textarea
                            style={{ minHeight: '50px' }}
                            value={formData.reasons}
                            placeholder='Escriba las razones del cambio arbitrario del stock...'
                            name='reasons'
                            onChange={handleChange}
                        ></textarea>
                    </div>
                )}
            </BodyContainer>
            <FooterWrapper>
                <ErrorContainer>
                    {printError('freeStock')}
                    {printError('stockLimit')}
                    {printError('reasons')}
                </ErrorContainer>
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

export default StockForm;
