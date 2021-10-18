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
import { createMoney, updateMoney } from 'api/money';
import moneySchema from 'validations/schemas/money';

const MoneyCreateForm = ({ handleClose, onSubmit }) => {
    const { handleChange, loading, handleNumericInput, handleSubmit, formData, printError, hasError } = useForm({
        initialState: {
            name: '',
            amount: 0,
            currency: 'VES',
        },
        action: 'create',
        createResource: createMoney,
        editResource: updateMoney,
        schema: moneySchema,
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
                <TitleContainer>Crear Moneda</TitleContainer>
            </HeaderContainer>
            <BodyContainer>
                <InputContainer>
                    <LabeledInput
                        onChange={handleChange}
                        placeholder='Tipo'
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
                        onChange={handleChange}
                        placeholder='Total'
                        name='amount'
                        value={formData.amount}
                        thousandSeparator='.'
                        decimalSeparator=','
                        decimalScale={0}
                        errorborder={hasError('amount')}
                        required
                        as={NumberFormatInput}
                    />
                    {printError('amount')}
                </InputContainer>
                <InputContainer>
                    <select name='currency' onChange={handleChange} value={formData.currency} style={{ padding: '10px 0' }}>
                        <option value='VES'>VES</option>
                        <option value='USD'>USD</option>
                    </select>
                    {printError('currency')}
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
export default MoneyCreateForm;
