import { useEffect } from 'react';

import {
    Form,
    HeaderContainer,
    BodyContainer,
    FooterWrapper,
    FooterContainer,
    InputContainer,
    ButtonContainer,
    CloseButtonContainer,
    TitleContainer,
    ErrorAlert,
    ErrorContainer,
} from 'components/CommonLayout/form.layout';

import LabeledInput from 'components/LabeledInput';
import Button from 'components/Button';
import { colors } from 'styles/theme';
import { BookBookmark, XCircle, X } from 'phosphor-react';
import { useForm } from 'hooks/useForm';
import { createCategory, updateCategory } from 'api/categories';
import categorySchema from 'validations/schemas/category';

const CategoryForm = ({ category, action, handleClose, onSubmit }) => {
    const { handleChange, handleSubmit, formData, setFormData, submitErrors, submitSuccess } = useForm({
        initialState: {
            name: '',
        },
        action,
        createResource: createCategory,
        editResource: updateCategory,
        schema: categorySchema,
    });

    useEffect(() => {
        if (action === 'edit' && category) setFormData(category);
    }, [category, action, setFormData]);

    useEffect(() => {
        if (submitSuccess) {
            if (action === 'create') {
                onSubmit('La categoría se ha registrado con éxito');
            } else if (action === 'edit') {
                onSubmit('La categoría se ha actualizado con éxito');
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
                <TitleContainer>{action === 'create' ? 'Crear categoría' : 'Editar categoría'}</TitleContainer>
            </HeaderContainer>
            <BodyContainer>
                <InputContainer>
                    <LabeledInput
                        onChange={handleChange}
                        placeholder='Nombre'
                        name='name'
                        value={formData.name}
                        autoFocus
                        capitalize
                        required
                        errorborder={hasError('name')}
                    />
                    {printError('name')}
                </InputContainer>
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
export default CategoryForm;
