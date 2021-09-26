import React from 'react';

import * as L from './styles';
import { colors } from 'styles/theme';

import PaymentMethods from 'components/PaymentMethod';
import Button from 'components/Button';

const PaymentsForm = ({
    onPaymentInfoChange,
    onPaymentAdd,
    onPaymentDelete,
    selectedPaymentMethod,
    onPaymentMethodSelect,
    paymentInfo,
    paymentMethods,
}) => {
    return (
        <>
            <L.PaymentTitleContainer>
                <h2>Datos de pago</h2>
                <L.AddPaymentContainer>
                    <PaymentMethods.Selector
                        paymentList={paymentMethods}
                        onChange={(event) =>
                            onPaymentMethodSelect({
                                id: event.target.value,
                                name: paymentMethods.find((p) => p.id === Number(event.target.value)).name,
                            })
                        }
                    ></PaymentMethods.Selector>
                    <Button onClick={() => onPaymentAdd(selectedPaymentMethod)} background={colors.primary} color='white'>
                        +
                    </Button>
                    <Button onClick={() => onPaymentAdd(selectedPaymentMethod, true)} background={colors.brown} color='white'>
                        +
                    </Button>
                </L.AddPaymentContainer>
            </L.PaymentTitleContainer>
            {paymentInfo &&
                paymentInfo.length > 0 &&
                paymentInfo.map((paymentInfo) => {
                    return React.createElement(PaymentMethods[paymentInfo.name], {
                        key: paymentInfo.id,
                        onChange: (value, key) => onPaymentInfoChange(value, key, paymentInfo.id),
                        onDelete: () => onPaymentDelete(paymentInfo.id),
                        inputValue: {
                            amount: paymentInfo.amount,
                            transaction_code: paymentInfo.transaction_code,
                            bankId: paymentInfo.bankId,
                            currency: paymentInfo.currency,
                            isChange: paymentInfo.isChange,
                        },
                    });
                })}
        </>
    );
};

export default PaymentsForm;
