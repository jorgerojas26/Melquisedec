import { useState } from 'react';
import * as L from 'components/CommonLayout/main.layout';
import Toolbar from 'components/Toolbar';
import SupplyingsTable from 'components/ModuleTables/SupplyingsTable';
import { useNotification } from 'hooks/notification';
import SupplyingForm from './CRUDForm';
import Modal from 'components/Modal';
import { deleteSupplying } from 'api/supplyings';
import ConfirmAlert from 'components/ConfirmAlert';
import Notification from 'components/Notification';

const Supplyings = () => {
    const [selectedSupplying, setSelectedSupplying] = useState(null);
    const [CRUDAction, setCRUDAction] = useState(null);
    const { notification, showNotification } = useNotification();

    function handleCRUD(event) {
        if (event.currentTarget.name === 'ToolbarCreate') {
            setCRUDAction('create');
        } else if (event.currentTarget.name === 'ToolbarEdit') {
            setCRUDAction('edit');
        } else if (event.currentTarget.name === 'ToolbarDelete') {
            setCRUDAction('delete');
        }
    }

    const handleSubmit = (submitMessage) => {
        showNotification('success', submitMessage, 2000);
        setCRUDAction('refresh');
        setCRUDAction('create');
    };

    const handleDelete = async () => {
        const response = await deleteSupplying(selectedSupplying.id);

        refreshTable();
        setSelectedSupplying(null);

        return response;
    };

    const refreshTable = () => {
        setCRUDAction('refresh');
        setCRUDAction(null);
    };

    return (
        <L.Wrapper>
            <L.ToolbarContainer>
                <Toolbar onCreate={handleCRUD} onEdit={handleCRUD} onDelete={handleCRUD} recordSelected={selectedSupplying} />
            </L.ToolbarContainer>
            <L.ContentContainer>
                <L.TableContainer>
                    <SupplyingsTable
                        onSupplyingSelect={setSelectedSupplying}
                        selectedRows={selectedSupplying}
                        shouldRefresh={CRUDAction === 'refresh'}
                        showNotification={showNotification}
                    />
                </L.TableContainer>
                <Modal backdrop show={CRUDAction ? true : false} handleClose={() => setCRUDAction(null)}>
                    {(CRUDAction === 'create' || CRUDAction === 'edit' || CRUDAction === 'refresh') && (
                        <L.FormContainer>
                            <SupplyingForm
                                onSubmit={handleSubmit}
                                action={CRUDAction}
                                supplying={CRUDAction === 'edit' && selectedSupplying}
                                handleClose={() => setCRUDAction(null)}
                            />
                        </L.FormContainer>
                    )}
                    {CRUDAction === 'delete' && (
                        <L.ConfirmContainer>
                            <ConfirmAlert
                                showNotification={showNotification}
                                handleClose={() => setCRUDAction(null)}
                                callback={handleDelete}
                            />
                        </L.ConfirmContainer>
                    )}
                </Modal>
            </L.ContentContainer>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </L.Wrapper>
    );
};
export default Supplyings;
