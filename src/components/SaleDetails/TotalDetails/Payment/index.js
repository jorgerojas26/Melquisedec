import { TotalContainer } from 'pages/SalesControl/layout.styles';
import React from 'react';

const PaymentTotal = ({ paymentTotal = {}, twoRowsOnly }) => {
    return (
        <TotalContainer style={{ borderLeft: '1px solid black' }}>
            <legend>Total pago</legend>
            {Object.keys(paymentTotal).map((key, index) => {
                const total = paymentTotal[key];
                const green = key === 'Total' ? { style: { color: 'green' } } : {};

                if (twoRowsOnly && Object.keys(paymentTotal).length > 2) {
                    return (
                        <div key={index} style={{ flexDirection: 'row' }}>
                            <label>{key}: </label>
                            <label {...green}>{total.toLocaleString()}</label>
                        </div>
                    );
                } else {
                    return (
                        <React.Fragment key={index}>
                            <label>{key}: </label>
                            <label {...green}>{total.toLocaleString()}</label>
                        </React.Fragment>
                    );
                }
            })}
        </TotalContainer>
    );
};

export default PaymentTotal;
