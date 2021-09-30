import {useEffect} from 'react';

import {FormContainer} from 'components/CommonLayout/main.layout';
import {
    HeaderContainer,
    BodyContainer,
    CloseButtonContainer,
    TitleContainer,
    FooterWrapper,
    FooterContainer,
    ButtonContainer,
} from 'components/CommonLayout/form.layout';
import {colors} from 'styles/theme';
import * as L from './styles';
import Modal from 'components/Modal';
import Button from 'components/Button';
import SalesControlTable from 'components/ModuleTables/SalesControlTable';
import ClientDetails from 'components/SaleDetails/ClientDetails';
import PaymentDetails from 'components/SaleDetails/PaymentDetails';

import {X, BookBookmark, XCircle} from 'phosphor-react';

import InvoiceTotal from 'components/SaleDetails/TotalDetails/Invoice';
import PaymentTotal from 'components/SaleDetails/TotalDetails/Payment';

import {usePayment} from 'hooks/usePayment';
import {useSaleProducts} from 'hooks/useSaleProducts';

export const SaleDetailsModal = ({
    products,
    client = {name: null, cedula: null, phoneNumber: null},
    paymentsArray,
    show,
    debtInfo,
    onClose,
}) => {
    const {paymentInfo, setPaymentInfo, paymentTotal} = usePayment();
    const {invoiceProducts, setInvoiceProducts, subtotal, saleTotal} = useSaleProducts();
    useEffect(() => {
        if (products) {
            setInvoiceProducts(products);
        }
        if (paymentsArray) {
            setPaymentInfo(paymentsArray);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentsArray, products]);

    return (
        <Modal backdrop show={show} handleClose={onClose}>
            <FormContainer large>
                <HeaderContainer>
                    <CloseButtonContainer>
                        <Button onClick={onClose}>
                            <X />
                        </Button>
                    </CloseButtonContainer>
                    <TitleContainer>{`Detalles de la venta`}</TitleContainer>
                </HeaderContainer>
                <BodyContainer>
                    <L.MetadataContainer>
                        <L.ClientContainer>
                            <legend>Cliente</legend>
                            <ClientDetails
                                name={client && client.name}
                                cedula={client && client.cedula}
                                phoneNumber={client && client.phoneNumber}
                            />
                        </L.ClientContainer>
                        <L.PaymentsContainer>
                            <legend>Pagos</legend>
                            <PaymentDetails paymentInfo={paymentInfo} />
                        </L.PaymentsContainer>
                    </L.MetadataContainer>
                    <L.TableContainer>
                        <SalesControlTable products={invoiceProducts} />
                    </L.TableContainer>
                    <L.TotalContainer>
                        <InvoiceTotal subtotal={subtotal} invoiceTotal={saleTotal} />
                        <PaymentTotal twoRowsOnly paymentTotal={paymentTotal} />
                    </L.TotalContainer>
                </BodyContainer>
                <FooterWrapper>
                    <FooterContainer>
                        <ButtonContainer color={colors.primary}>
                            {debtInfo && (
                                <Button type='submit'>
                                    <BookBookmark size={24} />
                                    Pagar
                                </Button>
                            )}
                        </ButtonContainer>
                        <ButtonContainer color='red'>
                            <Button onClick={onClose}>
                                <XCircle size={24} />
                                Cancelar
                            </Button>
                        </ButtonContainer>
                    </FooterContainer>
                </FooterWrapper>
            </FormContainer>
        </Modal>
    );
};

export default SaleDetailsModal;
