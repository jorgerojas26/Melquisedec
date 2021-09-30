import React from 'react';

import PaymentMethods from 'components/PaymentMethod';

const PaymentDetails = ({ paymentInfo = [] }) => {
    return (
        <div style={{ gap: '2px' }}>
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
        </div>
    );
};

export default PaymentDetails;
