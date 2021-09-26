import { useState } from 'react';
import { FormContainer } from 'components/CommonLayout/main.layout';
import { HeaderContainer, BodyContainer, CloseButtonContainer, TitleContainer } from 'components/CommonLayout/form.layout';
import * as L from './styles';
import Modal from 'components/Modal';
import DebtsTable from 'components/ModuleTables/DebtsTable';
import Button from 'components/Button';
import { X } from 'phosphor-react';
import SaleDetailsModal from 'components/ModuleModals/SaleDetailsModal';
import getProductName from 'utils/getProductName';

export const DebtsModal = ({ show, selectedDebts, client, onClose, onDebtSelect }) => {
    const [showDebtDetails, setShowDebtDetails] = useState(false);
    const [debtDetails, setDebtDetails] = useState({});

    return (
        <>
            <Modal backdrop show={showDebtDetails ? false : show} handleClose={onClose}>
                <FormContainer medium>
                    <HeaderContainer>
                        <CloseButtonContainer>
                            <Button onClick={onClose}>
                                <X />
                            </Button>
                        </CloseButtonContainer>
                        <TitleContainer>{`Deudas de ${client.name} - ${Number(client.cedula).toLocaleString('es-VE')}`}</TitleContainer>
                    </HeaderContainer>
                    <BodyContainer overflow={1}>
                        {client && client.sale && client.sale.length > 0 ? (
                            <L.Wrapper>
                                <L.TableContainer>
                                    <DebtsTable
                                        onShowDetailsClick={(debtDetails) => {
                                            setShowDebtDetails(true);
                                            setDebtDetails(debtDetails);
                                        }}
                                        data={client.sale}
                                        selectedRows={selectedDebts}
                                        onDebtSelect={onDebtSelect}
                                    />
                                </L.TableContainer>
                            </L.Wrapper>
                        ) : (
                            'El cliente no posee deudas'
                        )}
                    </BodyContainer>
                </FormContainer>
            </Modal>
            <SaleDetailsModal
                show={showDebtDetails}
                onClose={() => setShowDebtDetails(false)}
                products={
                    debtDetails &&
                    debtDetails.products &&
                    debtDetails.products.reduce(
                        (acc, product) => [
                            {
                                name: getProductName(product.product_variant),
                                price: product.price,
                                converted_price: product.converted_price,
                                quantity: product.quantity,
                            },
                            ...acc,
                        ],
                        []
                    )
                }
                client={client}
                paymentsArray={
                    debtDetails &&
                    debtDetails.payment &&
                    debtDetails.payment.reduce(
                        (acc, payment) => [
                            {
                                ...payment,
                                name: payment.payment_method.name,
                                amount: Number(payment.amount),
                            },
                            ...acc,
                        ],
                        []
                    )
                }
            />
        </>
    );
};

export default DebtsModal;
