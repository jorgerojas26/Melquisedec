import {
    Wrapper,
    Header,
    Main,
    MainHeader,
    HeaderTitleContainer,
    Heading,
    DolarValueContainer,
    MainBodyWrapper,
    MainBody,
} from "./layout.styles";

import { Switch, Route } from "react-router-dom";

import Navbar from "components/Navbar";
import Notification from "components/Notification";

import ClientsPage from "pages/Clients";
import UsersPage from "pages/Users";
import SuppliersPage from "pages/Suppliers";
import CategoriesPage from "pages/Categories";
import ProductsPage from "pages/Products";
import Button from "components/Button";

import { useRedirectToActiveLocation } from "hooks/redirect";
import { useDolarValue } from "hooks/useDolarValue";

const HomePage = () => {
    useRedirectToActiveLocation();

    const { dolarValue, notification, showNotification, updateDolarValue } = useDolarValue();

    const handleDolarChange = () => {
        let response = prompt("Ingrese el valor del dolar");

        if (response !== null) {
            if (isNaN(response) || response === "") {
                showNotification("error", "El valor del dólar debe ser numérico", 3000);
            } else {
                updateDolarValue(response);
            }
        }
    };

    return (
        <Wrapper>
            <Header>
                <Navbar />
            </Header>
            <Main>
                <MainHeader>
                    <HeaderTitleContainer>
                        <Heading>{localStorage.getItem("activeLocation")}</Heading>
                    </HeaderTitleContainer>
                    <DolarValueContainer>
                        <h3>Valor del dolar:</h3>
                        <span>
                            {(dolarValue && dolarValue.toLocaleString("es-VE")) || (
                                <span style={{ color: "red" }}>No hay valor asignado</span>
                            )}
                        </span>
                        <Button onClick={handleDolarChange}>Editar</Button>
                    </DolarValueContainer>
                </MainHeader>
                <MainBodyWrapper>
                    <MainBody>
                        <Switch>
                            <Route path="/control-de-ventas">Hola</Route>
                            <Route path="/inventario">Hola</Route>
                            <Route path="/deudas">Hola</Route>
                            <Route path="/categorias" component={CategoriesPage} />
                            <Route path="/clientes" component={ClientsPage} />
                            <Route path="/productos" component={ProductsPage} />
                            <Route path="/ventas">Hola</Route>
                            <Route path="/abastecimientos">Hola</Route>
                            <Route path="/proveedores" component={SuppliersPage} />
                            <Route path="/usuarios" component={UsersPage} />
                        </Switch>
                    </MainBody>
                </MainBodyWrapper>
            </Main>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </Wrapper>
    );
};

export default HomePage;
