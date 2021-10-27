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
import { updateMoney } from 'api/money';
import moneySchema from 'validations/schemas/money';
import { useEffect } from 'react';

const MoneyUpdateAmount = ({ action, money, handleClose, onSubmit }) => {
    const { loading, handleSubmit, handleChange, handleNumericInput, formData, setFormData, printError, hasError } = useForm({
        initialState: {
            id: null,
            payment_method_id: null,
            amount: 0,
            currency: 'VES',
            reasons: '',
        },
        action: 'edit',
        editResource: updateMoney,
        schema: moneySchema,
        onSubmitSuccess: onSubmit,
    });

    useEffect(() => {
        if (money) setFormData({ ...formData, id: money.id, payment_method_id: money.payment_method.id, currency: money.currency });
    }, [money]);

    return (
        <Form
            onSubmit={(event) =>
                handleSubmit(event, {
                    id: formData.id,
                    payment_method_id: formData.payment_method_id,
                    amount:
                        action === 'add' ? Number(money.amount) + Number(formData.amount) : Number(money.amount) - Number(formData.amount),
                    currency: formData.currency,
                    reasons: formData.reasons,
                })
            }
        >
            <HeaderContainer>
                <CloseButtonContainer>
                    <Button onClick={handleClose}>
                        <X />
                    </Button>
                </CloseButtonContainer>
                <TitleContainer>{`${action === 'add' ? 'Sumar' : 'Restar'} moneda`}</TitleContainer>
            </HeaderContainer>
            <BodyContainer>
                <InputContainer>
                    <LabeledInput
                        onValueChange={({ value }) => handleNumericInput(value, 'amount')}
                        placeholder='Total'
                        name='amount'
                        thousandSeparator='.'
                        decimalSeparator=','
                        decimalScale={2}
                        fixedDecimalScale={true}
                        errorborder={hasError('amount')}
                        autoFocus
                        required
                        as={NumberFormatInput}
                    />
                    {printError('amount')}
                </InputContainer>
                <InputContainer>
                    <textarea
                        onChange={handleChange}
                        placeholder='Razones'
                        name='reasons'
                        errorborder={hasError('reasons')}
                        required
                        style={{ resize: 'none', height: '100px' }}
                    ></textarea>
                    {printError('reasons')}
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
export default MoneyUpdateAmount;
