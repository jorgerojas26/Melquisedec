import { useState, useEffect } from "react";

import {
    Wrapper,
    ContentContainer,
    ToolbarContainer,
    TableContainer,
    FormContainer,
    ConfirmContainer,
} from "components/CommonLayout/main.layout";

import Modal from "components/Modal";
import Toolbar from "components/Toolbar";
import ProductsTable from "components/ModuleTables/ProductsTable";
import { useNotification } from "hooks/notification";
import Notification from "components/Notification";
import ConfirmAlert from "components/ConfirmAlert";
import ProductForm from "./CRUDForm";
import { deleteProductVariantApi } from "api/product_variants";
import { useDolarValue } from "hooks/useDolarValue";

const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [CRUDAction, setCRUDAction] = useState(null);
    const { notification, showNotification } = useNotification(null);
    const { dolarValue } = useDolarValue();

    useEffect(() => {
        if (CRUDAction === "refresh") setSelectedProduct(null);
    }, [CRUDAction]);

    const handleCRUD = (event) => {
        if (!dolarValue) {
            showNotification("error", "Debe asignar un valor al dolar", 3000);
            return;
        }
        if (event.currentTarget.name === "ToolbarCreate") {
            setCRUDAction("create");
        } else if (event.currentTarget.name === "ToolbarEdit") {
            setCRUDAction("edit");
        } else if (event.currentTarget.name === "ToolbarDelete") {
            setCRUDAction("delete");
        }
    };

    const handleSubmit = (submitMessage) => {
        showNotification("success", submitMessage, 2000);
        setCRUDAction("refresh");
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
                    />
                </ToolbarContainer>
                <TableContainer>
                    <ProductsTable
                        shouldRefresh={CRUDAction === "refresh"}
                        selectedRowID={selectedProduct && selectedProduct.id}
                        onProductSelect={setSelectedProduct}
                        showNotification={showNotification}
                    />
                </TableContainer>
                <Modal
                    backdrop
                    show={CRUDAction && CRUDAction !== "refresh"}
                    handleClose={() => {
                        setCRUDAction(null);
                    }}
                >
                    {(CRUDAction === "create" || CRUDAction === "edit") && (
                        <FormContainer medium>
                            <ProductForm
                                product={selectedProduct && selectedProduct.product}
                                action={CRUDAction}
                                handleClose={() => setCRUDAction(null)}
                                onSubmit={handleSubmit}
                            />
                        </FormContainer>
                    )}
                    {CRUDAction === "delete" && (
                        <ConfirmContainer>
                            <ConfirmAlert
                                handleClose={() => setCRUDAction(null)}
                                callback={async () => {
                                    await deleteProductVariantApi(selectedProduct.id);
                                    setCRUDAction("refresh");
                                    setSelectedProduct(null);
                                }}
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
