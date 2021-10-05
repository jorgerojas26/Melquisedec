import { useState } from 'react';

import Toolbar from 'components/Toolbar';
import * as L from 'components/CommonLayout/main.layout';

import Modal from 'components/Modal';
import WidgetBox from 'components/WidgetBox';
import SalesTable from 'components/ModuleTables/SalesTable';
import Button from 'components/Button';
import { colors } from 'styles/theme';
import { Eye } from 'phosphor-react';
import SaleDetailsModal from 'components/ModuleModals/SaleDetailsModal';
import ConfirmAlert from 'components/ConfirmAlert';
import { useNotification } from 'hooks/notification';
import Notification from 'components/Notification';

import { deleteSale } from 'api/sales';

const Sales = () => {
    const [selectedSale, setSelectedSale] = useState();
    const [CRUDAction, setCRUDAction] = useState(null);
    const { notification, showNotification } = useNotification();

    const handleDelete = async () => {
        const response = await deleteSale(selectedSale.id);
        if (response.error) {
            showNotification('error', response.error.message);
        } else {
            setCRUDAction('refresh');
            setSelectedSale(null);
        }
    };

    return (
        <L.Wrapper>
            <L.SeparatorWrapper>
                <L.ContentContainer>
                    <L.ToolbarContainer>
                        <Toolbar deleteText='Anular' recordSelected={selectedSale} onDelete={() => setCRUDAction('delete')}>
                            <div>
                                <Button
                                    onClick={() => setCRUDAction('view')}
                                    background={colors.primary}
                                    color='white'
                                    disabled={!selectedSale}
                                >
                                    <Eye size='24' />
                                    Ver Detalles
                                </Button>
                            </div>
                        </Toolbar>
                    </L.ToolbarContainer>
                    <L.TableContainer>
                        <SalesTable
                            onSaleSelect={setSelectedSale}
                            selectedRows={selectedSale}
                            shouldRefresh={CRUDAction === 'refresh'}
                            onError={() => {}}
                        />
                    </L.TableContainer>
                    <SaleDetailsModal
                        show={CRUDAction === 'view'}
                        details={selectedSale}
                        onClose={() => setCRUDAction(null)}
                        onPayment={() => setCRUDAction('refresh')}
                    />
                    <Modal backdrop show={CRUDAction === 'delete'} handleClose={() => setCRUDAction(null)}>
                        <L.ConfirmContainer>
                            <ConfirmAlert handleClose={() => setCRUDAction(null)} callback={handleDelete} />
                        </L.ConfirmContainer>
                    </Modal>
                </L.ContentContainer>
                <WidgetBox></WidgetBox>
            </L.SeparatorWrapper>
            {notification && <Notification type={notification.type}>{notification.message}</Notification>}
        </L.Wrapper>
    );
};

export default Sales;
