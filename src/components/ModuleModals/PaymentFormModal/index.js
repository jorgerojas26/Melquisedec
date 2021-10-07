import Modal from 'components/Modal';
import { FormContainer, ConfirmContainer } from 'components/CommonLayout/main.layout';
import {
    HeaderContainer,
    BodyContainer,
    FooterWrapper,
    FooterContainer,
    CloseButtonContainer,
    TitleContainer,
    ButtonContainer,
    ErrorAlert,
} from 'components/CommonLayout/form.layout';
import Button from 'components/Button';
import { X } from 'phosphor-react';
import PaymentsForm from 'components/PaymentsForm';
import PaymentTotal from 'components/SaleDetails/TotalDetails/Payment';
import ConfirmAlert from 'components/ConfirmAlert';

import { colors } from 'styles/theme';

import { create_payment_for_sale } from 'api/payments';
import { useConfirm } from 'hooks/useConfirm';
import { useCurrencyRates } from 'hooks/useCurrencyRates';
import { usePayment } from 'hooks/usePayment';
import { useFormError } from 'hooks/formError';

const PaymentFormModal = ({ show, handleClose, backdrop, onSubmit, sale }) => {
    const { currencyRates } = useCurrencyRates(false);
    const { confirmState, setConfirmState } = useConfirm();
    const { errors, handleErrors } = useFormError();

    const {
        paymentTotal,
        paymentInfo,
        onPaymentInfoChange,
        onPaymentAdd,
        onPaymentDelete,
        paymentMethods,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
    } = usePayment({ name: 'POS', currency: 'VES' });

    const submitPayment = async () => {
        const response = await create_payment_for_sale(paymentInfo, sale.id);
        if (response.error) {
            handleErrors(response.error);
        } else {
            onSubmit();
        }
    };

    const paymentSubmitHandler = async () => {
        const total_payment = paymentTotal['Total'];
        const debt_total = Number((sale.debt.current_amount * currencyRates['PAYMENT_VES'].value).toFixed(2));

        if (total_payment > debt_total) {
            setConfirmState({
                ...confirmState,
                message: 'El monto a pagar es MAYOR al de la deuda. ¿Desea continuar?',
                callback: submitPayment,
            });
        } else {
            submitPayment();
        }
    };

    return (
        show && (
            <>
                <Modal show={show} handleClose={handleClose} backdrop={backdrop} zindex={4}>
                    <FormContainer width='500px'>
                        <HeaderContainer>
                            <CloseButtonContainer>
                                <Button onClick={handleClose}>
                                    <X />
                                </Button>
                            </CloseButtonContainer>
                            <TitleContainer>Formulario de pago</TitleContainer>
                        </HeaderContainer>
                        <BodyContainer overflow={1}>
                            <PaymentsForm
                                showTitle={false}
                                onPaymentInfoChange={onPaymentInfoChange}
                                onPaymentAdd={onPaymentAdd}
                                onPaymentDelete={onPaymentDelete}
                                selectedPaymentMethod={selectedPaymentMethod}
                                onPaymentMethodSelect={setSelectedPaymentMethod}
                                paymentInfo={paymentInfo}
                                paymentMethods={paymentMethods}
                            />
                            <div style={{ flexDirection: 'row', justifyContent: 'end' }}>
                                <PaymentTotal paymentTotal={paymentTotal} twoRowsOnly />
                            </div>
                        </BodyContainer>
                        <FooterWrapper>
                            <FooterContainer>
                                {errors && errors['paymentInfo'] && <ErrorAlert>{errors['paymentInfo']}</ErrorAlert>}
                                <ButtonContainer color={colors.primary}>
                                    <Button onClick={paymentSubmitHandler} type='submit'>
                                        Enviar
                                    </Button>
                                </ButtonContainer>
                                <ButtonContainer color='red'>
                                    <Button>Cancelar</Button>
                                </ButtonContainer>
                            </FooterContainer>
                        </FooterWrapper>
                    </FormContainer>
                </Modal>
                {confirmState.show && (
                    <Modal backdrop show={confirmState.show} handleClose={() => setConfirmState({ ...confirmState, show: false })}>
                        <ConfirmContainer>
                            <ConfirmAlert
                                additionalActions={confirmState.actions}
                                message={confirmState.message}
                                handleClose={() => setConfirmState({ ...confirmState, show: false })}
                                callback={confirmState.callback}
                            />
                        </ConfirmContainer>
                    </Modal>
                )}
            </>
        )
    );
};

export default PaymentFormModal;
