import { useState } from 'react';

import {
    Wrapper,
    SeparatorWrapper,
    ContentContainer,
    ToolbarContainer,
    TableContainer,
    FormContainer,
    ConfirmContainer,
} from 'components/CommonLayout/main.layout';

import CategoriesTable from 'components/ModuleTables/CategoriesTable';
import Toolbar from 'components/Toolbar';
import Modal from 'components/Modal';
import CategoryForm from './CRUDForm';
import ConfirmAlert from 'components/ConfirmAlert';
import { useEffect } from 'react';
import { deleteCategory } from 'api/categories';
import Notification from 'components/Notification';
import { useNotification } from 'hooks/notification';

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [CRUDAction, setCRUDAction] = useState(null);
    const { notification, showNotification } = useNotification(null);

    useEffect(() => {
        if (CRUDAction === 'refresh') setSelectedCategory(null);
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
        const response = await deleteCategory(selectedCategory.id);
        setCRUDAction('refresh');
        setSelectedCategory(null);
        return response;
    };

    return (
        <Wrapper>
            <SeparatorWrapper>
                <ContentContainer>
                    <ToolbarContainer>
                        <Toolbar
                            recordSelected={selectedCategory ? true : false}
                            onCreate={handleCRUD}
                            onEdit={handleCRUD}
                            onDelete={handleCRUD}
                        />
                    </ToolbarContainer>
                    <TableContainer>
                        <CategoriesTable
                            shouldRefresh={CRUDAction === 'refresh'}
                            selectedRows={selectedCategory}
                            onCategorySelect={setSelectedCategory}
                            showNotification={showNotification}
                        />
                    </TableContainer>
                    <Modal backdrop show={CRUDAction && CRUDAction !== 'refresh' ? true : false} handleClose={() => setCRUDAction(null)}>
                        {(CRUDAction === 'create' || CRUDAction === 'edit') && (
                            <FormContainer>
                                <CategoryForm
                                    onSubmit={handleSubmit}
                                    action={CRUDAction}
                                    category={CRUDAction === 'edit' && selectedCategory}
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

export default Categories;
