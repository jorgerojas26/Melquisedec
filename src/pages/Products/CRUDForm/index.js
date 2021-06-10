import { useEffect } from 'react';

import {
    Form,
    HeaderContainer,
    BodyContainer,
    FooterWrapper,
    FooterContainer,
    ButtonContainer,
    CloseButtonContainer,
    TitleContainer,
    ErrorAlert,
    ErrorContainer,
} from 'components/CommonLayout/form.layout';

import { GeneralInfoContainer, VariantsContainer, InputContainer } from './layout.styles';

import LabeledInput from 'components/LabeledInput';
import Button from 'components/Button';
import { colors } from 'styles/theme';
import { BookBookmark, XCircle, X } from 'phosphor-react';
import { useForm } from 'hooks/useForm';
import { createProduct, updateProduct } from 'api/products';
import productSchema from 'validations/schemas/product';
import VariantForm from './variantForm';

const ProductForm = ({ product, action, handleClose, onSubmit }) => {
    const { handleChange, handleNestedChange, handleSubmit, formData, setFormData, submitErrors, submitSuccess } = useForm({
        initialState: {
            name: '',
            brand: '',
            product_variant: [
                {
                    name: '',
                    price: '',
                    profitPercent: '',
                    unitValue: '',
                    imagePath: null,
                },
            ],
        },
        action,
        createResource: createProduct,
        editResource: updateProduct,
        schema: productSchema,
    });

    useEffect(() => {
        if (action === 'edit' && product) setFormData(product);
    }, [product, action, setFormData]);

    useEffect(() => {
        if (submitSuccess) {
            if (action === 'create') {
                onSubmit('El producto se ha registrado con éxito');
            } else if (action === 'edit') {
                onSubmit('El producto se ha actualizado con éxito');
            }
        }
    }, [submitSuccess, action, onSubmit]);

    const printError = (path) => {
        if (submitErrors[path]) {
            return <ErrorAlert>{submitErrors[path]}</ErrorAlert>;
        }
    };

    const hasError = (path) => {
        return submitErrors[path];
    };

    return (
        <Form onSubmit={handleSubmit}>
            <HeaderContainer>
                <CloseButtonContainer>
                    <Button onClick={handleClose}>
                        <X />
                    </Button>
                </CloseButtonContainer>
                <TitleContainer>{action === 'create' ? 'Crear producto' : 'Editar producto'}</TitleContainer>
            </HeaderContainer>
            <BodyContainer>
                <h4>Información General</h4>
                <GeneralInfoContainer>
                    <InputContainer>
                        <LabeledInput
                            placeholder='Tipo'
                            onChange={handleChange}
                            name='name'
                            value={formData.name}
                            autoFocus
                            capitalize
                            errorborder={hasError('name')}
                        />
                        {printError('name')}
                    </InputContainer>
                    <InputContainer>
                        <LabeledInput
                            placeholder='Marca'
                            onChange={handleChange}
                            name='brand'
                            value={formData.brand}
                            capitalize
                            errorborder={hasError('brand')}
                        />
                        {printError('brand')}
                    </InputContainer>
                </GeneralInfoContainer>
                <h4>Variantes</h4>
                <VariantsContainer>
                    {formData.product_variant.length > 0 &&
                        formData.product_variant.map((variant, index) => {
                            return (
                                <VariantForm
                                    key={index}
                                    CRUDAction={action}
                                    formData={formData}
                                    setFormData={setFormData}
                                    product_variant={variant}
                                    index={index}
                                    handleNestedChange={handleNestedChange}
                                    submitErrors={submitErrors}
                                />
                            );
                        })}
                </VariantsContainer>
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
export default ProductForm;
