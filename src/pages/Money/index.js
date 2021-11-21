import { useState } from 'react';

import * as L from 'components/CommonLayout/main.layout';
import Toolbar from 'components/Toolbar';
import Modal from 'components/Modal';
import Notification from 'components/Notification';
import MoneyTable from 'components/ModuleTables/MoneyTable';
import { ButtonContainer } from 'components/Toolbar/styles';
import Button from 'components/Button';
import { Plus, Minus, FileSearch } from 'phosphor-react';
import MoneyUpdateAmount from './CRUDForm/update_amount';
import { useNotification } from 'hooks/notification';
import MoneyHistoryTable from 'components/ModuleTables/MoneyHistory';
import { HeaderContainer, BodyContainer, CloseButtonContainer, TitleContainer } from 'components/CommonLayout/form.layout';
import { X } from 'phosphor-react';

const MoneyPage = () => {
    const [selectedMoney, setSelectedMoney] = useState(null);
    const [CRUDAction, setCRUDAction] = useState(null);
    const { notification, showNotification } = useNotification();

    const handleSubmit = (submitMessage) => {
        showNotification('success', submitMessage, 2000);
        setSelectedMoney(null);
        setCRUDAction('refresh');
    };

    return (
        <L.Wrapper>
            <L.SeparatorWrapper>
                <L.ContentContainer>
                    <L.ToolbarContainer>
                        <Toolbar recordSelected={selectedMoney}>
                            <ButtonContainer color='brown'>
                                <Button onClick={() => setCRUDAction('history')}>
                                    <FileSearch size='20px' />
                                    Historial
                                </Button>
                            </ButtonContainer>
                            <ButtonContainer color='orange'>
                                <Button onClick={() => setCRUDAction('add')} disabled={!selectedMoney}>
                                    <Plus size='20px' />
                                    Sumar
                                </Button>
                            </ButtonContainer>
                            <ButtonContainer color='red'>
                                <Button onClick={() => setCRUDAction('sub')} disabled={!selectedMoney}>
                                    <Minus size='20px' />
                                    Restar
                                </Button>
                            </ButtonContainer>
                        </Toolbar>
                    </L.ToolbarContainer>
                    <L.TableContainer>
                        <MoneyTable
                            onMoneySelect={setSelectedMoney}
                            showNotification={showNotification}
                            selectedRows={selectedMoney}
                            shouldRefresh={CRUDAction === 'refresh'}
                        />
                    </L.TableContainer>
                    <Modal backdrop show={CRUDAction && CRUDAction !== 'refresh' ? true : false} handleClose={() => setCRUDAction(null)}>
                        {(CRUDAction === 'add' || CRUDAction === 'sub') && (
                            <L.FormContainer>
                                <MoneyUpdateAmount
                                    money={selectedMoney}
                                    action={CRUDAction}
                                    onSubmit={handleSubmit}
                                    handleClose={() => setCRUDAction(null)}
                                />
                            </L.FormContainer>
                        )}
                        {CRUDAction === 'history' && (
                            <L.FormContainer width='1000px'>
                                <HeaderContainer>
                                    <CloseButtonContainer>
                                        <Button onClick={() => setCRUDAction(null)}>
                                            <X />
                                        </Button>
                                    </CloseButtonContainer>
                                    <TitleContainer>Historial de cambios</TitleContainer>
                                </HeaderContainer>
                                <BodyContainer>
                                    <MoneyHistoryTable />
                                </BodyContainer>
                            </L.FormContainer>
                        )}
                    </Modal>
                </L.ContentContainer>
            </L.SeparatorWrapper>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </L.Wrapper>
    );
};

export default MoneyPage;
