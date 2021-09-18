import React, { useState, useRef } from 'react';

import * as L from './layout.styles';
import { InlineContainer, ButtonContainer } from 'components/CommonLayout/form.layout';
import { ConfirmContainer, Wrapper, SeparatorWrapper, ContentContainer } from 'components/CommonLayout/main.layout';

import WidgetBox from 'components/WidgetBox';
import ClientSearch from 'components/ClientSearch';
import LabeledInput from 'components/LabeledInput';
import SalesControlTable from 'components/ModuleTables/SalesControlTable';
import SaleProductForm from 'components/SaleProductForm';
import DebtsModal from 'components/ModuleModals/DebtsModal';
import Button from 'components/Button';
import Notification from 'components/Notification';
import ConfirmAlert from 'components/ConfirmAlert';
import NumberInput from 'react-number-format';
import Modal from 'components/Modal';
import PaymentMethods, { paymentList } from 'components/PaymentMethod';
import { colors } from 'styles/theme';
import { useSale } from 'hooks/useSale';

const SalesControl = () => {
    const {
        loading,
        selectedClient,
        selectedProduct,
        selectedDebts,
        invoiceProducts,
        subtotal,
        saleTotal,
        debtTotal,
        paymentTotal,
        paymentInfo,
        onProductSubmit,
        onProductSelect,
        onProductDelete,
        onClientSelect,
        onDebtSelect,
        addPaymentMethod,
        onPaymentInfoChange,
        onPaymentDelete,
        onSaleSubmit,
        submitSale,
        notification,
        resetFields,
        confirmState,
        setConfirmState,
        onConfirmClose,
    } = useSale();

    const [showDebts, setShowDebts] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash');

    const productSearchRef = useRef(null);
    const clientCedulaRef = useRef(null);
    const clientPhoneNumberRef = useRef(null);

    return (
        <Wrapper>
            <SeparatorWrapper>
                <ContentContainer>
                    <L.MainContainer>
                        <L.MetadataContainer>
                            <L.ClientContainer>
                                <h2>Datos del cliente</h2>
                                <ClientSearch value={selectedClient} onSelect={onClientSelect} />
                                <InlineContainer>
                                    <L.ClientNameContainer>
                                        <LabeledInput
                                            value={selectedClient.cedula || ''}
                                            innerRef={clientCedulaRef}
                                            placeholder='Cédula'
                                            thousandSeparator='.'
                                            decimalSeparator=','
                                            disabled
                                            errorborder={selectedClient && selectedClient.debts}
                                            as={NumberInput}
                                        />
                                    </L.ClientNameContainer>
                                    <L.ClientPhoneNumberContainer>
                                        <LabeledInput
                                            value={selectedClient.phoneNumber || ''}
                                            innerRef={clientPhoneNumberRef}
                                            placeholder='Teléfono'
                                            disabled
                                            format='( #### ) - ### - ####'
                                            errorborder={selectedClient && selectedClient.debts}
                                            as={NumberInput}
                                        />
                                    </L.ClientPhoneNumberContainer>
                                </InlineContainer>
                                {selectedClient && selectedClient.debts && (
                                    <div>
                                        <Button onClick={() => setShowDebts(true)} background='red' color='white'>
                                            Ver Deudas
                                        </Button>
                                    </div>
                                )}
                            </L.ClientContainer>
                            <L.PaymentsContainer>
                                <L.PaymentTitleContainer>
                                    <h2>Datos de pago</h2>
                                    <L.AddPaymentContainer>
                                        <PaymentMethods.Selector
                                            paymentList={paymentList}
                                            onChange={(event) => setSelectedPaymentMethod(event.target.value)}
                                        ></PaymentMethods.Selector>

                                        <Button
                                            onClick={() => addPaymentMethod(selectedPaymentMethod)}
                                            background={colors.primary}
                                            color='white'
                                        >
                                            +
                                        </Button>
                                        <Button
                                            onClick={() => addPaymentMethod(selectedPaymentMethod, true)}
                                            background={colors.brown}
                                            color='white'
                                        >
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
                                                code: paymentInfo.code,
                                                bankId: paymentInfo.bankId,
                                                currency: paymentInfo.currency,
                                                isChange: paymentInfo.isChange,
                                            },
                                        });
                                    })}
                            </L.PaymentsContainer>
                        </L.MetadataContainer>
                        <L.OrderDetailsContainer>
                            <L.InvoiceFormContainer>
                                <L.ProductFormContainer>
                                    <SaleProductForm
                                        productToEdit={selectedProduct}
                                        productSearchRef={productSearchRef}
                                        onSubmit={onProductSubmit}
                                    />
                                </L.ProductFormContainer>
                                <L.TableContainer>
                                    <SalesControlTable
                                        onProductSelect={onProductSelect}
                                        selectedRows={selectedProduct}
                                        products={invoiceProducts}
                                        onDeleteRow={onProductDelete}
                                    />
                                </L.TableContainer>
                                <L.FooterContainer>
                                    <L.InvoiceTotalContainer>
                                        <L.TotalContainer>
                                            <legend>Total factura</legend>
                                            <label>Subtotal: </label>
                                            <label>{subtotal.toLocaleString()}</label>
                                            {debtTotal > 0 && (
                                                <>
                                                    <label>Deuda: </label>
                                                    <label>{debtTotal.toLocaleString()}</label>
                                                </>
                                            )}
                                            <label>Total: </label>
                                            <label style={{ color: 'green' }}>{saleTotal.toLocaleString()}</label>
                                        </L.TotalContainer>
                                        <L.TotalContainer style={{ borderLeft: '1px solid black' }}>
                                            <legend>Total pago</legend>
                                            {Object.keys(paymentTotal).map((key) => {
                                                const total = paymentTotal[key];
                                                return (
                                                    <>
                                                        <label>{key}: </label>
                                                        <label style={key === 'Total' ? { color: 'green' } : {}}>
                                                            {total.toLocaleString()}
                                                        </label>
                                                    </>
                                                );
                                            })}
                                        </L.TotalContainer>
                                    </L.InvoiceTotalContainer>
                                    <L.ActionsContainer>
                                        <ButtonContainer color={colors.primary}>
                                            <Button loading={loading} onClick={onSaleSubmit}>
                                                Enviar
                                            </Button>
                                        </ButtonContainer>
                                        <ButtonContainer color='red'>
                                            <Button onClick={resetFields}>Reset</Button>
                                        </ButtonContainer>
                                    </L.ActionsContainer>
                                </L.FooterContainer>
                            </L.InvoiceFormContainer>
                        </L.OrderDetailsContainer>
                    </L.MainContainer>
                </ContentContainer>
                <WidgetBox onClose={() => {}}>hola</WidgetBox>
            </SeparatorWrapper>
            <DebtsModal
                show={showDebts}
                client={selectedClient}
                onClose={() => setShowDebts(false)}
                selectedDebts={selectedDebts}
                onDebtSelect={onDebtSelect}
            />
            <Modal backdrop show={confirmState.show} handleClose={onConfirmClose}>
                <ConfirmContainer>
                    <ConfirmAlert
                        additionalActions={confirmState.actions}
                        message={confirmState.message}
                        handleClose={onConfirmClose}
                        callback={confirmState.callback}
                    />
                </ConfirmContainer>
            </Modal>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </Wrapper>
    );
};

export default SalesControl;
