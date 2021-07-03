import { useState, useEffect } from 'react';

import {
    Wrapper,
    SeparatorWrapper,
    ContentContainer,
    ToolbarContainer,
    TableContainer,
    FormContainer,
    ConfirmContainer,
} from 'components/CommonLayout/main.layout';

import ClientWidgets from 'components/Widgets/ClientWidgets';
import ClientsTable from 'components/ModuleTables/ClientsTable';
import Toolbar from 'components/Toolbar';
import Modal from 'components/Modal';
import ClientForm from './CRUDForm';
import ConfirmAlert from 'components/ConfirmAlert';
import { deleteClient } from 'api/clients';
import Notification from 'components/Notification';
import { useNotification } from 'hooks/notification';

const Clients = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [CRUDAction, setCRUDAction] = useState(null);
    const [showWidgets, setShowWidgets] = useState(false);
    const { notification, showNotification } = useNotification(null);

    useEffect(() => {
        setShowWidgets(selectedClient ? true : false);
    }, [selectedClient]);

    useEffect(() => {
        if (CRUDAction === 'refresh') setSelectedClient(null);
    }, [CRUDAction]);

    const handleCRUD = (event) => {
        if (event.currentTarget.name === 'ToolbarCreate') {
            setCRUDAction('create');
        } else if (event.currentTarget.name === 'ToolbarEdit') {
            setCRUDAction('edit');
        } else if (event.currentTarget.name === 'ToolbarDelete') {
            setCRUDAction('delete');
        }
        setShowWidgets(false);
    };

    const handleSubmit = (submitMessage) => {
        showNotification('success', submitMessage, 2000);
        setCRUDAction('refresh');
    };

    const handleDelete = async () => {
        const response = await deleteClient(selectedClient.id);
        setCRUDAction('refresh');
        setSelectedClient(null);
        return response;
    };

    return (
        <Wrapper>
            <SeparatorWrapper>
                <ContentContainer>
                    <ToolbarContainer>
                        <Toolbar
                            recordSelected={selectedClient ? true : false}
                            onCreate={handleCRUD}
                            onEdit={handleCRUD}
                            onDelete={handleCRUD}
                        />
                    </ToolbarContainer>
                    <TableContainer>
                        <ClientsTable
                            shouldRefresh={CRUDAction === 'refresh'}
                            selectedRowID={selectedClient && selectedClient.id}
                            onClientSelect={setSelectedClient}
                            showNotification={showNotification}
                        />
                    </TableContainer>
                    <Modal backdrop show={CRUDAction && CRUDAction !== 'refresh' ? true : false} handleClose={() => setCRUDAction(null)}>
                        {(CRUDAction === 'create' || CRUDAction === 'edit') && (
                            <FormContainer>
                                <ClientForm
                                    onSubmit={handleSubmit}
                                    action={CRUDAction}
                                    client={CRUDAction === 'edit' && selectedClient}
                                    handleClose={() => setCRUDAction(null)}
                                />
                            </FormContainer>
                        )}
                        {CRUDAction === 'delete' && (
                            <ConfirmContainer>
                                <ConfirmAlert
                                    showNotification={showNotification}
                                    handleClose={() => setCRUDAction(null)}
                                    callback={handleDelete}
                                />
                            </ConfirmContainer>
                        )}
                    </Modal>
                </ContentContainer>
                <ClientWidgets
                    activeRecord={selectedClient}
                    show={showWidgets}
                    onClose={() => {
                        setShowWidgets(false);
                        setSelectedClient(null);
                    }}
                />
            </SeparatorWrapper>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </Wrapper>
    );
};

export default Clients;
