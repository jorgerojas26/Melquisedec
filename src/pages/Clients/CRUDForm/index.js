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
    ErrorContainer,
} from 'components/CommonLayout/form.layout';

import LabeledInput from 'components/LabeledInput';
import Button from 'components/Button';
import NumberFormatInput from 'react-number-format';
import { colors } from 'styles/theme';
import { BookBookmark, XCircle, X } from 'phosphor-react';
import { useForm } from 'hooks/useForm';
import { createClient, updateClient } from 'api/clients';
import clientSchema from 'validations/schemas/client';

const ClientForm = ({ client, action, handleClose, onSubmit }) => {
    const { handleChange, handleNumericInput, handleSubmit, formData, printError, hasError } = useForm({
        initialState: {
            name: '',
            cedula: '',
            phoneNumber: '',
            ...client,
        },
        action,
        createResource: createClient,
        editResource: updateClient,
        schema: clientSchema,
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
                <TitleContainer>{action === 'create' ? 'Crear cliente' : 'Editar cliente'}</TitleContainer>
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
                <InputContainer>
                    <LabeledInput
                        onValueChange={(values) => handleNumericInput(values.value, 'cedula')}
                        placeholder='Cédula'
                        name='cedula'
                        value={formData.cedula}
                        thousandSeparator='.'
                        decimalSeparator=','
                        decimalScale={0}
                        as={NumberFormatInput}
                        required
                        errorborder={hasError('cedula')}
                    />
                    {printError('cedula')}
                </InputContainer>
                <InputContainer>
                    <LabeledInput
                        onValueChange={(values) => handleNumericInput(values.value, 'phoneNumber')}
                        placeholder='Teléfono'
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        format='( #### ) - ### - ####'
                        allowEmptyFormatting
                        mask='_'
                        type='tel'
                        as={NumberFormatInput}
                        errorborder={hasError('phoneNumber')}
                    />
                    {printError('phoneNumber')}
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
export default ClientForm;
