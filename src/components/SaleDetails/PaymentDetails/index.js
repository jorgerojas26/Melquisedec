import React from 'react';

import PaymentMethods from 'components/PaymentMethod';
import * as L from './styles';

const PaymentDetails = ({ paymentInfo = [] }) => {
    return (
        <L.Wrapper style={{ gap: '1px', marginTop: '0' }}>
            {paymentInfo.map((payment) => {
                return React.createElement(PaymentMethods[payment.payment_method_name || payment.name], {
                    key: payment.id,
                    disabled: true,
                    inputValue: {
                        amount: payment.amount,
                        transaction_code: payment.transaction_code,
                        bankId: payment.bankId,
                        currency: payment.currency,
                        isChange: payment.isChange,
                    },
                });
            })}
        </L.Wrapper>
    );
};

export default PaymentDetails;
