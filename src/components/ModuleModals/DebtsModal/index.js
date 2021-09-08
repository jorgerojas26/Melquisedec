import { FormContainer } from 'components/CommonLayout/main.layout';
import { HeaderContainer, CloseButtonContainer, TitleContainer } from 'components/CommonLayout/form.layout';
import * as L from './styles';
import Modal from 'components/Modal';
import DebtsTable from 'components/ModuleTables/DebtsTable';
import Button from 'components/Button';
import { X } from 'phosphor-react';

export const DebtsModal = ({ show, selectedDebts, client, onClose, onDebtSelect }) => {
    return (
        <Modal backdrop show={show} handleClose={onClose}>
            <FormContainer medium>
                <HeaderContainer>
                    <CloseButtonContainer>
                        <Button onClick={onClose}>
                            <X />
                        </Button>
                    </CloseButtonContainer>
                    <TitleContainer>{`Deudas de ${client.name} - ${Number(client.cedula).toLocaleString('es-VE')}`}</TitleContainer>
                </HeaderContainer>
                {client && client.debts ? (
                    <L.Wrapper>
                        <L.TableContainer>
                            <DebtsTable
                                data={[
                                    {
                                        id: 1,
                                        name: 'Jorge Rojas',
                                        debtVES: 5500000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 2,
                                        name: 'Jorge Rojas',
                                        debtVES: 2200000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 2,
                                        name: 'Jorge Rojas',
                                        debtVES: 2200000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 2,
                                        name: 'Jorge Rojas',
                                        debtVES: 2200000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 2,
                                        name: 'Jorge Rojas',
                                        debtVES: 2200000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 2,
                                        name: 'Jorge Rojas',
                                        debtVES: 2200000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 2,
                                        name: 'Jorge Rojas',
                                        debtVES: 2200000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 2,
                                        name: 'Jorge Rojas',
                                        debtVES: 2200000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 2,
                                        name: 'Jorge Rojas',
                                        debtVES: 2200000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 2,
                                        name: 'Jorge Rojas',
                                        debtVES: 2200000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 2,
                                        name: 'Jorge Rojas',
                                        debtVES: 2200000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 3,
                                        name: 'Jorge Rojas',
                                        debtVES: 2530000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 4,
                                        name: 'Jorge Rojas',
                                        debtVES: 750000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 5,
                                        name: 'Jorge Rojas',
                                        debtVES: 10000000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 6,
                                        name: 'Jorge Rojas',
                                        debtVES: 10325423,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 7,
                                        name: 'Jorge Rojas',
                                        debtVES: 2000000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 8,
                                        name: 'Jorge Rojas',
                                        debtVES: 2000000,
                                        createdAt: new Date(),
                                    },
                                    {
                                        id: 25635215,
                                        name: 'Jorge Rojas',
                                        debtVES: 2000000,
                                        createdAt: new Date(),
                                    },
                                ]}
                                selectedRows={selectedDebts}
                                onDebtSelect={onDebtSelect}
                            />
                        </L.TableContainer>
                    </L.Wrapper>
                ) : (
                    'El cliente no posee deudas'
                )}
            </FormContainer>
        </Modal>
    );
};

export default DebtsModal;
