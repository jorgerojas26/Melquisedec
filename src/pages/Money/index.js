import * as L from 'components/CommonLayout/main.layout';
import Toolbar from 'components/Toolbar';

const MoneyPage = () => {
    return (
        <L.Wrapper>
            <L.SeparatorWrapper>
                <L.ContentContainer>
                    <ToolbarContainer>
                        <Toolbar onCreate={handleCRUD} onEdit={handleCRUD} onDelete={handleCRUD} recordSelected={selectedSupplier} />
                    </ToolbarContainer>
                    <TableContainer>// money table</TableContainer>
                    <Modal backdrop show={CRUDAction && CRUDAction !== 'refresh' ? true : false} handleClose={() => setCRUDAction(null)}>
                        {(CRUDAction === 'create' || CRUDAction === 'edit') && <FormContainer>// money crud form</FormContainer>}
                    </Modal>
                </L.ContentContainer>
            </L.SeparatorWrapper>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </L.Wrapper>
    );
};

export default MoneyPage;
