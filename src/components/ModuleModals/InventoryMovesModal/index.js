import { useState } from 'react';
import { FormContainer } from 'components/CommonLayout/main.layout';
import { HeaderContainer, BodyContainer, CloseButtonContainer, TitleContainer, TableContainer } from 'components/CommonLayout/form.layout';
import Modal from 'components/Modal';
import InventoryMovesTable from 'components/ModuleTables/InventoryMovesTable';
import Button from 'components/Button';
import { X } from 'phosphor-react';

export const InventoryMovesModal = ({ show, onClose }) => {
    const [debtDetails, setDebtDetails] = useState({});

    return (
        <Modal backdrop show={show} handleClose={onClose}>
            <FormContainer width='900px'>
                <HeaderContainer>
                    <CloseButtonContainer>
                        <Button onClick={onClose}>
                            <X />
                        </Button>
                    </CloseButtonContainer>
                    <TitleContainer>Movimientos arbitrarios</TitleContainer>
                </HeaderContainer>
                <BodyContainer>
                    <InventoryMovesTable />
                </BodyContainer>
            </FormContainer>
        </Modal>
    );
};

export default InventoryMovesModal;
