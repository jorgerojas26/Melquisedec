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

const StockForm = ({ variant, handleClose, onSubmit }) => {
    const [freeStock, setFreeStock] = useState(0);
    const [stockTotal, setStockTotal] = useState(0);

    const { formData, handleNestedChange, setFormData, handleSubmit, submitErrors, setSubmitErrors, printError } = useForm({
        initialState: {
            id: '',
            name: '',
            product_variant: [],
        },
        action: 'edit',
        editResource: updateProduct,
        schema: productSchema,
        onSubmitSuccess: onSubmit,
    });

    useEffect(() => {
        if (variant) {
            const total = variant.product.product_variant.reduce((old, current) => old + current.stock * current.unitValue, 0);
            setStockTotal(total);
        }
    }, [variant]);

    useEffect(() => {
        if (variant) setFormData({ ...variant.product });
    }, [variant, setFormData]);

    const handleChange = (selector, index, key, value) => {
        if (isNaN(parseInt(value))) {
            value = 0;
        } else {
            value = parseInt(value);
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
        let stockToAsign = 0;
        if (action === 'plus') {
            stockToAsign = Math.floor(freeStock / product.unitValue) + product.stock;
        }

        const { newFreeStock, newProductStock } = releaseOrAssign({
            freeStock,
            currentStock: product.stock,
            unitValue: product.unitValue,
            value: stockToAsign,
        });

        handleNestedChange(selector, index, key, newProductStock);
        setFreeStock(newFreeStock);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (freeStock === 0) {
            handleSubmit(event);
        } else {
            submitErrors['freeStock'] = 'Debe asignar el stock liberado';
            setSubmitErrors({ ...submitErrors });
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
                            <span>{`${freeStock} `}</span>
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
                                    <Label>{variant.product.name + ' ' + productVariant.name}</Label>
                                    <NumberInput
                                        value={formData['product_variant'][index].stock}
                                        onChange={(value) => handleChange('product_variant', index, 'stock', value)}
                                        onCtrlClick={(action) => ctrlClickHandler('product_variant', index, 'stock', action)}
                                    />
                                </VariantContainer>
                            );
                        })}
                </Variants>
            </BodyContainer>
            <FooterWrapper>
                <ErrorContainer>{printError('freeStock')}</ErrorContainer>
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
