import {
    Form,
    HeaderContainer,
    BodyContainer,
    FooterWrapper,
    FooterContainer,
    ButtonContainer,
    CloseButtonContainer,
    TitleContainer,
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
    const { handleChange, handleNestedChange, handleSubmit, formData, setFormData, submitErrors, printError, hasError } = useForm({
        initialState: {
            name: '',
            brand: '',
            product_variant: [
                {
                    name: '',
                    price: 0,
                    profitPercent: 30,
                    unitValue: '',
                    imagePath: null,
                },
            ],
            ...product,
        },
        action,
        createResource: createProduct,
        editResource: updateProduct,
        schema: productSchema,
        onSubmitSuccess: onSubmit,
    });

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
            <BodyContainer overflow={1}>
                <h4>Información General</h4>
                <GeneralInfoContainer>
                    <InputContainer>
                        <LabeledInput
                            placeholder='* Tipo'
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
                                    printError={printError}
                                    hasError={hasError}
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
