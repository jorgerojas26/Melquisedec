import React, { useState, useRef, useEffect } from 'react';

import * as L from './layout.styles';
import { colors } from 'styles/theme';

import { InlineContainer, ButtonContainer } from 'components/CommonLayout/form.layout';
import { FormContainer, ConfirmContainer, Wrapper, SeparatorWrapper, ContentContainer } from 'components/CommonLayout/main.layout';

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
import ClientForm from 'pages/Clients/CRUDForm';
import PaymentsForm from 'components/PaymentsForm';
import InvoiceTotal from 'components/SaleDetails/TotalDetails/Invoice';
import PaymentTotal from 'components/SaleDetails/TotalDetails/Payment';

import { useSale } from 'hooks/useSale';

const SalesControl = () => {
    const {
        loading,
        paymentMethods,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
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
        onPaymentAdd,
        onPaymentInfoChange,
        onPaymentDelete,
        onSaleSubmit,
        onSaveDebtHandler,
        notification,
        showNotification,
        resetFields,
        confirmState,
        onConfirmClose,
    } = useSale({
        onSubmitSuccess: () => {
            productSearchRef.current.focus();
        },
    });
    console.log(paymentInfo);

    const [showDebts, setShowDebts] = useState(false);
    const [clientSearchInput, setClientSearchInput] = useState('');
    const [showClientForm, setShowClientForm] = useState(false);

    const productSearchRef = useRef(null);
    const clientSearchRef = useRef(null);
    const clientCedulaRef = useRef(null);
    const clientPhoneNumberRef = useRef(null);

    useEffect(() => {
        const listener = (event) => {
            if (event.ctrlKey && event.keyCode === 13) {
                onSaleSubmit(event);
            }
        };
        document.body.addEventListener('keyup', listener);

        return function cleanUp() {
            document.body.removeEventListener('keyup', listener);
        };
    });

    return (
        <Wrapper>
            <SeparatorWrapper>
                <ContentContainer>
                    <L.MainContainer>
                        <L.ActionsContainer>
                            <ButtonContainer color={colors.primary}>
                                <Button loading={loading} onClick={onSaleSubmit}>
                                    Enviar
                                </Button>
                            </ButtonContainer>
                            <ButtonContainer color={colors.secondary}>
                                <Button loading={loading} onClick={onSaveDebtHandler}>
                                    Guardar Deuda
                                </Button>
                            </ButtonContainer>
                            <ButtonContainer color='red'>
                                <Button onClick={resetFields}>Reset</Button>
                            </ButtonContainer>
                        </L.ActionsContainer>
                        <L.MetadataContainer>
                            <L.ClientContainer>
                                <h3>Datos del cliente</h3>
                                <ClientSearch
                                    innerRef={clientSearchRef}
                                    value={selectedClient}
                                    onSelect={onClientSelect}
                                    onCreate={(input) => {
                                        setShowClientForm(true);
                                        setClientSearchInput(input);
                                    }}
                                />
                                <InlineContainer>
                                    <L.ClientNameContainer>
                                        <LabeledInput
                                            value={selectedClient.cedula || ''}
                                            innerRef={clientCedulaRef}
                                            placeholder='Cédula'
                                            thousandSeparator='.'
                                            decimalSeparator=','
                                            disabled
                                            errorborder={selectedClient && selectedClient.sale && selectedClient.sale.length > 0}
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
                                            errorborder={selectedClient && selectedClient.sale && selectedClient.sale.length > 0}
                                            as={NumberInput}
                                        />
                                    </L.ClientPhoneNumberContainer>
                                </InlineContainer>
                                {selectedClient && selectedClient.sale && selectedClient.sale.length > 0 && (
                                    <div>
                                        <Button onClick={() => setShowDebts(true)} background='red' color='white'>
                                            Ver Deudas
                                        </Button>
                                    </div>
                                )}
                            </L.ClientContainer>
                            <L.PaymentsContainer>
                                <PaymentsForm
                                    paymentInfo={paymentInfo}
                                    paymentMethods={paymentMethods || []}
                                    selectedPaymentMethod={selectedPaymentMethod}
                                    onPaymentInfoChange={onPaymentInfoChange}
                                    onPaymentAdd={onPaymentAdd}
                                    onPaymentDelete={onPaymentDelete}
                                    onPaymentMethodSelect={setSelectedPaymentMethod}
                                />
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
                                        onDeleteRow={(product) => {
                                            onProductDelete(product);
                                            productSearchRef.current.focus();
                                        }}
                                        maxHeight='2048px'
                                    />
                                </L.TableContainer>
                                <L.FooterContainer>
                                    <L.InvoiceTotalContainer>
                                        <InvoiceTotal subtotal={subtotal} debtTotal={debtTotal} invoiceTotal={saleTotal} />
                                        <PaymentTotal twoRowsOnly paymentTotal={paymentTotal} />
                                    </L.InvoiceTotalContainer>
                                </L.FooterContainer>
                            </L.InvoiceFormContainer>
                        </L.OrderDetailsContainer>
                    </L.MainContainer>
                </ContentContainer>
                <WidgetBox onClose={() => {}}></WidgetBox>
            </SeparatorWrapper>
            <DebtsModal
                show={showDebts}
                client={selectedClient}
                onClose={() => setShowDebts(false)}
                selectedDebts={selectedDebts}
                //onDebtSelect={onDebtSelect}
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
            <Modal backdrop show={showClientForm} handleClose={onConfirmClose}>
                <FormContainer>
                    <ClientForm
                        onSubmit={(successMessage, newClient) => {
                            showNotification('success', successMessage);
                            setShowClientForm(false);
                            clientSearchRef.current.focus();
                        }}
                        action='create'
                        handleClose={() => setShowClientForm(false)}
                        client={isNaN(Number(clientSearchInput)) ? { name: clientSearchInput } : { cedula: clientSearchInput }}
                        autoFocus={isNaN(Number(clientSearchInput)) ? 'cedula' : 'name'}
                    />
                </FormContainer>
            </Modal>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </Wrapper>
    );
};

export default SalesControl;
