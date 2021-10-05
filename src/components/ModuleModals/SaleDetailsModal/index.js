import { useEffect, useState } from 'react';

import { FormContainer } from 'components/CommonLayout/main.layout';
import {
    HeaderContainer,
    BodyContainer,
    CloseButtonContainer,
    TitleContainer,
    FooterWrapper,
    FooterContainer,
    ButtonContainer,
    LoadingDiv,
} from 'components/CommonLayout/form.layout';
import { colors } from 'styles/theme';
import * as L from './styles';
import Modal from 'components/Modal';
import Button from 'components/Button';
import SalesControlTable from 'components/ModuleTables/SalesControlTable';
import ClientDetails from 'components/SaleDetails/ClientDetails';
import PaymentDetails from 'components/SaleDetails/PaymentDetails';
import PaymentFormModal from '../PaymentFormModal';
import { ErrorAlert } from 'components/CommonLayout/form.layout';
import Notification from 'components/Notification';

import { X, BookBookmark, XCircle } from 'phosphor-react';

import InvoiceTotal from 'components/SaleDetails/TotalDetails/Invoice';
import PaymentTotal from 'components/SaleDetails/TotalDetails/Payment';

import { usePayment } from 'hooks/usePayment';
import { useSaleProducts } from 'hooks/useSaleProducts';
import { getSaleById } from 'api/sales';
import { useFormError } from 'hooks/formError';
import { useNotification } from 'hooks/notification';

export const SaleDetailsModal = ({ show, details, onClose, onPayment = () => {} }) => {
    const { paymentInfo, setPaymentInfo, paymentTotal } = usePayment();
    const { invoiceProducts, setInvoiceProducts, subtotal, saleTotal } = useSaleProducts();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [saleDetails, setSaleDetails] = useState({});
    const { errors, handleErrors } = useFormError();
    const [loading, setLoading] = useState(false);
    const { notification, showNotification } = useNotification(null);

    useEffect(() => {
        if (details) {
            setSaleDetails(details);
            setPaymentInfo(details.payment || []);
            setInvoiceProducts(details.products || []);
        }
    }, [details]);

    const onPaymentSubmit = async () => {
        showNotification('success', 'El pago se ha realizado con éxito');
        setShowPaymentModal(false);
        setLoading(true);
        const sale = await getSaleById(saleDetails.id);
        console.log('sale details', sale);
        if (sale.error) {
            handleErrors(sale.error);
        } else {
            setSaleDetails(sale[0]);
            setPaymentInfo(sale[0].payment);
            setInvoiceProducts(sale[0].products);
            onPayment();
        }
        setLoading(false);
    };

    console.log(saleDetails);
    return (
        <>
            <Modal backdrop show={show} handleClose={onClose}>
                <FormContainer width='800px'>
                    <HeaderContainer>
                        <CloseButtonContainer>
                            <Button onClick={onClose}>
                                <X />
                            </Button>
                        </CloseButtonContainer>
                        <TitleContainer>{`Detalles de la venta`}</TitleContainer>
                    </HeaderContainer>
                    <BodyContainer>
                        {loading ? (
                            <LoadingDiv>Cargando...</LoadingDiv>
                        ) : (
                            <>
                                <L.MetadataContainer>
                                    <L.ClientContainer>
                                        <legend>Cliente</legend>
                                        <ClientDetails
                                            name={saleDetails.client && saleDetails.client.name}
                                            cedula={saleDetails.client && saleDetails.client.cedula}
                                            phoneNumber={saleDetails.client && saleDetails.client.phoneNumber}
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
                                    <L.DebtInfoTotal>
                                        <legend>Deuda</legend>
                                        <label>Fecha: </label>
                                        <strong>
                                            {saleDetails && saleDetails.debt && new Date(saleDetails.debt.createdAt).toLocaleString()}
                                        </strong>
                                        <label>Original:</label>
                                        <strong>${saleDetails && saleDetails.debt && saleDetails.debt.original_amount.toFixed(2)}</strong>
                                        <label>Actual:</label>
                                        <strong>${saleDetails && saleDetails.debt && saleDetails.debt.current_amount.toFixed(2)}</strong>
                                        <label>Estado:</label>
                                        <strong>{saleDetails && saleDetails.debt && saleDetails.debt.paid ? 'Pagado' : 'No pagado'}</strong>
                                    </L.DebtInfoTotal>
                                    <PaymentTotal paymentTotal={paymentTotal} />
                                    <InvoiceTotal subtotal={subtotal} invoiceTotal={saleTotal} />
                                </L.TotalContainer>
                            </>
                        )}
                    </BodyContainer>
                    <FooterWrapper>
                        {errors && errors['undefined'] && <ErrorAlert>{errors['undefined']}</ErrorAlert>}
                        <FooterContainer>
                            <ButtonContainer color={colors.primary}>
                                {saleDetails.debt && saleDetails.debt.paid === 0 && (
                                    <Button onClick={() => setShowPaymentModal(true)} type='submit'>
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
            <PaymentFormModal
                show={showPaymentModal}
                backdrop
                handleClose={() => setShowPaymentModal(false)}
                onSubmit={onPaymentSubmit}
                sale={saleDetails}
            />
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </>
    );
};

export default SaleDetailsModal;
