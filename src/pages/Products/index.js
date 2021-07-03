import { useState, useEffect } from 'react';

import {
    Wrapper,
    ContentContainer,
    ToolbarContainer,
    TableContainer,
    FormContainer,
    ConfirmContainer,
} from 'components/CommonLayout/main.layout';

import Modal from 'components/Modal';
import Toolbar from 'components/Toolbar';
import { ButtonContainer } from 'components/Toolbar/styles';
import Button from 'components/Button';
import { colors } from 'styles/theme';
import { Package } from 'phosphor-react';
import ProductsTable from 'components/ModuleTables/ProductsTable';
import { useNotification } from 'hooks/notification';
import Notification from 'components/Notification';
import ConfirmAlert from 'components/ConfirmAlert';
import ProductForm from './CRUDForm';
import StockForm from './stockForm';
import { deleteProductVariantApi } from 'api/product_variants';

const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [CRUDAction, setCRUDAction] = useState(null);
    const { notification, showNotification } = useNotification(null);

    useEffect(() => {
        if (CRUDAction === 'refresh') setSelectedProduct(null);
    }, [CRUDAction]);

    const handleCRUD = (event) => {
        if (event.currentTarget.name === 'ToolbarCreate') {
            setCRUDAction('create');
        } else if (event.currentTarget.name === 'ToolbarEdit') {
            setCRUDAction('edit');
        } else if (event.currentTarget.name === 'ToolbarDelete') {
            setCRUDAction('delete');
        } else if (event.currentTarget.name === 'reassignStock') {
            setCRUDAction('reassignStock');
        }
    };

    const handleSubmit = (submitMessage) => {
        showNotification('success', submitMessage, 2000);
        setCRUDAction('refresh');
    };

    const handleDelete = async () => {
        const response = await deleteProductVariantApi(selectedProduct.id);
        setCRUDAction('refresh');
        setSelectedProduct(null);
        return response;
    };
    return (
        <Wrapper>
            <ContentContainer>
                <ToolbarContainer>
                    <Toolbar
                        recordSelected={selectedProduct ? true : false}
                        onCreate={handleCRUD}
                        onEdit={handleCRUD}
                        onDelete={handleCRUD}
                    >
                        <ButtonContainer color={colors.brown}>
                            <Button name='reassignStock' onClick={handleCRUD} disabled={!selectedProduct}>
                                <Package size='24' />
                                Reasignar Stock
                            </Button>
                        </ButtonContainer>
                    </Toolbar>
                </ToolbarContainer>
                <TableContainer>
                    <ProductsTable
                        shouldRefresh={CRUDAction === 'refresh'}
                        selectedRowID={selectedProduct && selectedProduct.id}
                        onProductSelect={setSelectedProduct}
                        showNotification={showNotification}
                    />
                </TableContainer>
                <Modal
                    backdrop
                    show={CRUDAction && CRUDAction !== 'refresh'}
                    handleClose={() => {
                        setCRUDAction(null);
                    }}
                >
                    {(CRUDAction === 'create' || CRUDAction === 'edit') && (
                        <FormContainer medium>
                            <ProductForm
                                product={CRUDAction === 'edit' && selectedProduct && selectedProduct.product}
                                action={CRUDAction}
                                handleClose={() => setCRUDAction(null)}
                                onSubmit={handleSubmit}
                            />
                        </FormContainer>
                    )}
                    {CRUDAction === 'reassignStock' && (
                        <FormContainer medium>
                            <StockForm
                                variant={selectedProduct && selectedProduct}
                                handleClose={() => setCRUDAction(null)}
                                onSubmit={handleSubmit}
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
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </Wrapper>
    );
};

export default Products;
