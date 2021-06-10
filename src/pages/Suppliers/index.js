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
import SuppliersTable from 'components/ModuleTables/SuppliersTable';
import { useNotification } from 'hooks/notification';
import Notification from 'components/Notification';
import SupplierForm from './CRUDForm';
import ConfirmAlert from 'components/ConfirmAlert';
import { deleteSupplier } from 'api/suppliers';

const Suppliers = () => {
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [CRUDAction, setCRUDAction] = useState(null);
    const { notification, showNotification } = useNotification(null);

    useEffect(() => {
        if (CRUDAction === 'refresh') setSelectedSupplier(null);
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

    return (
        <Wrapper>
            <SeparatorWrapper>
                <ContentContainer>
                    <ToolbarContainer>
                        <Toolbar onCreate={handleCRUD} onEdit={handleCRUD} onDelete={handleCRUD} recordSelected={selectedSupplier} />
                    </ToolbarContainer>
                    <TableContainer>
                        <SuppliersTable
                            onSupplierSelect={setSelectedSupplier}
                            selectedRowID={selectedSupplier && selectedSupplier.id}
                            showNotification={showNotification}
                            shouldRefresh={CRUDAction === 'refresh'}
                        />
                    </TableContainer>
                    <Modal backdrop show={CRUDAction && CRUDAction !== 'refresh' ? true : false} handleClose={() => setCRUDAction(null)}>
                        {(CRUDAction === 'create' || CRUDAction === 'edit') && (
                            <FormContainer>
                                <SupplierForm
                                    onSubmit={handleSubmit}
                                    action={CRUDAction}
                                    supplier={selectedSupplier}
                                    handleClose={() => setCRUDAction(null)}
                                />
                            </FormContainer>
                        )}
                        {CRUDAction === 'delete' && (
                            <ConfirmContainer>
                                <ConfirmAlert
                                    handleClose={() => setCRUDAction(null)}
                                    callback={async () => {
                                        await deleteSupplier(selectedSupplier.id);
                                        setCRUDAction('refresh');
                                        setSelectedSupplier(null);
                                    }}
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

export default Suppliers;
