import { useState, useRef } from 'react';
import * as L from './layout.styles';
import { ConfirmContainer, Wrapper, SeparatorWrapper, ContentContainer } from 'components/CommonLayout/main.layout';
import { BodyContainer, InlineContainer, InputContainer, ButtonContainer } from 'components/CommonLayout/form.layout';

import WidgetBox from 'components/WidgetBox';
import ClientSearch from 'components/ClientSearch';
import LabeledInput from 'components/LabeledInput';
import SalesControlTable from 'components/ModuleTables/SalesControlTable';
import SaleProductForm from 'components/SaleProductForm';
import NumberInput from 'react-number-format';
import Button from 'components/Button';
import { colors } from 'styles/theme';
import DebtsModal from 'components/ModuleModals/DebtsModal';
import Notification from 'components/Notification';
import ConfirmAlert from 'components/ConfirmAlert';
import Modal from 'components/Modal';
import { useSale } from 'hooks/useSale';
import { POS, Cash, Transfer } from 'components/PaymentMethod';

const SalesControl = () => {
    const {
        saleData,
        onProductSubmit,
        onProductSelect,
        onProductDelete,
        onClientSelect,
        onDebtSelect,
        onSaleSubmit,
        showConfirmDialog,
        setShowConfirmDialog,
        submitSale,
        notification,
        resetFields,
        confirmMessage,
    } = useSale();
    const [showDebts, setShowDebts] = useState(false);

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
                                <BodyContainer>
                                    <h2>Datos del cliente</h2>
                                    <ClientSearch value={saleData.selectedClient} onSelect={onClientSelect} />
                                    <InlineContainer>
                                        <L.ClientNameContainer>
                                            <LabeledInput
                                                value={saleData.selectedClient.cedula || ''}
                                                innerRef={clientCedulaRef}
                                                placeholder='Cédula'
                                                thousandSeparator='.'
                                                decimalSeparator=','
                                                disabled
                                                errorborder={saleData.selectedClient && saleData.selectedClient.debts}
                                                as={NumberInput}
                                            />
                                        </L.ClientNameContainer>
                                        <L.ClientPhoneNumberContainer>
                                            <LabeledInput
                                                value={saleData.selectedClient.phoneNumber || ''}
                                                innerRef={clientPhoneNumberRef}
                                                placeholder='Teléfono'
                                                disabled
                                                format='( #### ) - ### - ####'
                                                errorborder={saleData.selectedClient && saleData.selectedClient.debts}
                                                as={NumberInput}
                                            />
                                        </L.ClientPhoneNumberContainer>
                                    </InlineContainer>
                                    {saleData.selectedClient && saleData.selectedClient.debts && (
                                        <ButtonContainer color='red'>
                                            <Button onClick={() => setShowDebts(true)}>Ver Deudas</Button>
                                        </ButtonContainer>
                                    )}
                                </BodyContainer>
                            </L.ClientContainer>
                            <L.PaymentsContainer>
                                <BodyContainer>
                                    <h2>Datos de pago</h2>
                                    <InputContainer>
                                        <POS />
                                    </InputContainer>
                                    <InputContainer>
                                        <Transfer />
                                    </InputContainer>
                                    <InputContainer>
                                        <Cash />
                                    </InputContainer>
                                </BodyContainer>
                            </L.PaymentsContainer>
                        </L.MetadataContainer>
                        <L.OrderDetailsContainer>
                            <L.InvoiceFormContainer>
                                <L.ProductFormContainer>
                                    <SaleProductForm
                                        productToEdit={saleData.selectedProduct}
                                        productSearchRef={productSearchRef}
                                        onSubmit={onProductSubmit}
                                    />
                                </L.ProductFormContainer>
                                <L.TableContainer>
                                    <SalesControlTable
                                        onProductSelect={onProductSelect}
                                        selectedRows={saleData.selectedProduct}
                                        products={saleData.invoiceProducts}
                                        onDeleteRow={onProductDelete}
                                    />
                                </L.TableContainer>
                                <L.FooterContainer>
                                    {(saleData.totals.debtTotal > 0 || saleData.totals.subtotal > 0) && (
                                        <L.InvoiceTotalContainer>
                                            <L.TotalContainer>
                                                <label>Subtotal: </label>
                                                <label>{saleData.totals.subtotal.toLocaleString()}</label>
                                                {saleData.totals.debtTotal > 0 && (
                                                    <>
                                                        <label>Deuda: </label>
                                                        <label>{saleData.totals.debtTotal.toLocaleString()}</label>
                                                    </>
                                                )}
                                                <label>Total: </label>
                                                <label>{saleData.totals.total.toLocaleString()}</label>
                                            </L.TotalContainer>
                                        </L.InvoiceTotalContainer>
                                    )}
                                    <L.ActionsContainer>
                                        <ButtonContainer color={colors.primary}>
                                            <Button onClick={onSaleSubmit}>Enviar Venta</Button>
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
                client={saleData.selectedClient}
                onClose={() => setShowDebts(false)}
                selectedDebts={saleData.selectedDebts}
                onDebtSelect={onDebtSelect}
            />
            <Modal backdrop show={showConfirmDialog} handleClose={() => setShowConfirmDialog(false)}>
                {showConfirmDialog && (
                    <ConfirmContainer>
                        <ConfirmAlert message={confirmMessage} handleClose={() => setShowConfirmDialog(false)} callback={submitSale} />
                    </ConfirmContainer>
                )}
            </Modal>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </Wrapper>
    );
};

export default SalesControl;
