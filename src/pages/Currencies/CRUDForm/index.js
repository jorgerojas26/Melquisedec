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
import { createCurrency, updateCurrency } from 'api/currencies';
import currencySchema from 'validations/schemas/currency';

const CurrencyForm = ({ currency, action, handleClose, onSubmit }) => {
    const { loading, handleChange, handleNumericInput, handleSubmit, formData, printError, submitErrors, setSubmitErrors, hasError } =
        useForm({
            initialState: {
                currency: '',
                value: 0,
                rounding: 1,
                ...currency,
            },
            action,
            createResource: createCurrency,
            editResource: updateCurrency,
            schema: currencySchema,
            onSubmitSuccess: onSubmit,
        });

    const submitHandler = (event) => {
        event.preventDefault();

        if (action === 'create' && formData.currency === '') {
            setSubmitErrors({ ...submitErrors, currency: 'Debe proveer el nombre de la moneda' });
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
                <TitleContainer>{action === 'create' ? 'Crear moneda' : 'Editar moneda'}</TitleContainer>
            </HeaderContainer>
            <BodyContainer>
                {action === 'create' && (
                    <InputContainer>
                        <LabeledInput
                            onChange={handleChange}
                            placeholder='Nombre'
                            name='currency'
                            value={formData.currency}
                            autoFocus
                            capitalize
                            errorborder={hasError('currency')}
                        />
                        {printError('currency')}
                    </InputContainer>
                )}
                <InputContainer>
                    <LabeledInput
                        onValueChange={({ floatValue }) => handleNumericInput(floatValue, 'value')}
                        placeholder='Valor'
                        name='value'
                        value={formData.value}
                        thousandSeparator='.'
                        decimalSeparator=','
                        as={NumberFormatInput}
                        errorborder={hasError('value')}
                        autoFocus={action === 'edit'}
                    />
                    {printError('value')}
                </InputContainer>
                <InputContainer>
                    <LabeledInput
                        onValueChange={({ floatValue }) => handleNumericInput(floatValue, 'rounding')}
                        placeholder='Redondeo'
                        name='rounding'
                        value={formData.rounding}
                        thousandSeparator='.'
                        decimalSeparator=','
                        as={NumberFormatInput}
                        errorborder={hasError('rounding')}
                    />
                    {printError('rounding')}
                </InputContainer>
            </BodyContainer>
            <FooterWrapper>
                <ErrorContainer>{printError('undefined')}</ErrorContainer>
                <FooterContainer>
                    <ButtonContainer color={colors.primary}>
                        <Button loading={loading} type='submit'>
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
export default CurrencyForm;
