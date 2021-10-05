import { TotalContainer } from 'pages/SalesControl/layout.styles';
import React from 'react';
import * as L from './styles';

const PaymentTotal = ({ paymentTotal = {}, twoRowsOnly }) => {
    return (
        <TotalContainer>
            <legend>Total pago</legend>
            {Object.keys(paymentTotal).map((key, index) => {
                const total = paymentTotal[key];
                const green = key === 'Total' ? { style: { color: 'green' } } : {};

                return (
                    <L.GridContainer>
                        <label>{key}: </label>
                        <label {...green}>{total.toLocaleString()}</label>
                    </L.GridContainer>
                );
            })}
        </TotalContainer>
    );
};

export default PaymentTotal;
