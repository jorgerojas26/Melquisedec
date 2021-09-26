import { TotalContainer } from 'pages/SalesControl/layout.styles';

export const InvoiceTotal = ({ subtotal = '', debtTotal = '', invoiceTotal = '' }) => {
    return (
        <TotalContainer>
            <legend>Total factura</legend>
            <>
                <label>Subtotal: </label>
                <label>{subtotal.toLocaleString()}</label>
            </>
            {debtTotal > 0 && (
                <>
                    <label>Deuda: </label>
                    <label>{debtTotal.toLocaleString()}</label>
                </>
            )}
            <>
                <label>Total: </label>
                <label style={{ color: 'green' }}>{invoiceTotal.toLocaleString()}</label>
            </>
        </TotalContainer>
    );
};

export default InvoiceTotal;
