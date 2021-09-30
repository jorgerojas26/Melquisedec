import { useState } from 'react';
import { FormContainer } from 'components/CommonLayout/main.layout';
import { HeaderContainer, BodyContainer, CloseButtonContainer, TitleContainer } from 'components/CommonLayout/form.layout';
import * as L from './styles';
import Modal from 'components/Modal';
import DebtSelectionTable from 'components/ModuleTables/DebtSelectionTable';
import Button from 'components/Button';
import { X } from 'phosphor-react';
import SaleDetailsModal from 'components/ModuleModals/SaleDetailsModal';

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
                                    <DebtSelectionTable
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
                products={debtDetails && debtDetails.products}
                client={client}
                debtInfo={debtDetails && debtDetails.debt}
                paymentsArray={debtDetails && debtDetails.payment}
            />
        </>
    );
};

export default DebtsModal;
