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

import Modal from 'components/Modal';
import Toolbar from 'components/Toolbar';
import UsersTable from 'components/ModuleTables/UsersTable';
import { useNotification } from 'hooks/notification';
import Notification from 'components/Notification';
import UserForm from './CRUDForm';
import ConfirmAlert from 'components/ConfirmAlert';
import { deleteUser } from 'api/users';

const Users = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [CRUDAction, setCRUDAction] = useState(null);
    const { notification, showNotification } = useNotification(null);

    useEffect(() => {
        if (CRUDAction === 'refresh') setSelectedUser(null);
    }, [CRUDAction]);

    const handleCRUD = (event) => {
        if (event.currentTarget.name === 'ToolbarCreate') {
            setCRUDAction('create');
        } else if (event.currentTarget.name === 'ToolbarEdit') {
            setCRUDAction('edit');
        } else if (event.currentTarget.name === 'ToolbarDelete') {
            setCRUDAction('delete');
        }
    };

    const handleSubmit = (submitMessage) => {
        showNotification('success', submitMessage, 2000);
        setCRUDAction('refresh');
    };

    const handleDelete = async () => {
        const response = await deleteUser(selectedUser.id);
        setCRUDAction('refresh');
        setSelectedUser(null);
        return response;
    };

    return (
        <Wrapper>
            <SeparatorWrapper>
                <ContentContainer>
                    <ToolbarContainer>
                        <Toolbar onCreate={handleCRUD} onEdit={handleCRUD} onDelete={handleCRUD} recordSelected={selectedUser} />
                    </ToolbarContainer>
                    <TableContainer>
                        <UsersTable
                            onUserSelect={setSelectedUser}
                            selectedRows={selectedUser }
                            showNotification={showNotification}
                            shouldRefresh={CRUDAction === 'refresh'}
                        />
                    </TableContainer>
                    <Modal backdrop show={CRUDAction && CRUDAction !== 'refresh' ? true : false} handleClose={() => setCRUDAction(null)}>
                        {(CRUDAction === 'create' || CRUDAction === 'edit') && (
                            <FormContainer>
                                <UserForm
                                    onSubmit={handleSubmit}
                                    action={CRUDAction}
                                    user={CRUDAction === 'edit' && selectedUser}
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
            </SeparatorWrapper>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </Wrapper>
    );
};

export default Users;
