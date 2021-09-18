import { useState } from 'react';

import {
    Wrapper,
    ContentContainer,
    ToolbarContainer,
    TableContainer,
    FormContainer,
    ConfirmContainer,
} from 'components/CommonLayout/main.layout';

import Toolbar from 'components/Toolbar';
import CurrenciesTable from 'components/ModuleTables/CurrenciesTable';
import Modal from 'components/Modal';
import CurrencyForm from './CRUDForm/index';
import ConfirmAlert from 'components/ConfirmAlert';

import Notification from 'components/Notification';
import { useNotification } from 'hooks/notification';
import { deleteCurrency } from 'api/currencies';

const Currencies = () => {
    const [CRUDAction, setCRUDAction] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState(null);
    const { notification, showNotification } = useNotification(null);

    const handleSubmit = (submitMessage) => {
        showNotification('success', submitMessage, 2000);
        setCRUDAction('refresh');
    };

    const handleDelete = async () => {
        const response = await deleteCurrency(selectedCurrency.id);
        if (response.error) {
            showNotification('error', response.error.message);
        } else {
            showNotification('success', 'Se ha eliminado con éxito');
        }
        setCRUDAction('refresh');
        setSelectedCurrency(null);
    };

    return (
        <Wrapper>
            <ContentContainer>
                <ToolbarContainer>
                    <Toolbar
                        onCreate={() => setCRUDAction('create')}
                        onEdit={() => setCRUDAction('edit')}
                        onDelete={() => setCRUDAction('delete')}
                        recordSelected={selectedCurrency}
                    />
                </ToolbarContainer>
                <TableContainer>
                    <CurrenciesTable
                        selectedRows={selectedCurrency}
                        onCurrencySelect={setSelectedCurrency}
                        shouldRefresh={CRUDAction === 'refresh'}
                        showNotification={showNotification}
                    />
                </TableContainer>
                <Modal backdrop show={CRUDAction && CRUDAction !== 'refresh' ? true : false} handleClose={() => setCRUDAction(null)}>
                    {(CRUDAction === 'create' || CRUDAction === 'edit') && (
                        <FormContainer>
                            <CurrencyForm
                                onSubmit={handleSubmit}
                                action={CRUDAction}
                                currency={CRUDAction === 'edit' && selectedCurrency}
                                handleClose={() => setCRUDAction(null)}
                            />
                        </FormContainer>
                    )}
                    {CRUDAction === 'delete' && (
                        <ConfirmContainer>
                            <ConfirmAlert handleClose={() => setCRUDAction(null)} callback={handleDelete} />
                        </ConfirmContainer>
                    )}
                    {CRUDAction === 'delete' && <ConfirmContainer></ConfirmContainer>}
                </Modal>
            </ContentContainer>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </Wrapper>
    );
};

export default Currencies;
