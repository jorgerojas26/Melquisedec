import { HeaderTitleContainer, Heading, DolarValueContainer } from './layout.styles';

import * as L from './new-layout.styles';

import { Switch, Route } from 'react-router-dom';

import Navbar from 'components/Navbar';
import Notification from 'components/Notification';

import ClientsPage from 'pages/Clients';
import UsersPage from 'pages/Users';
import SuppliersPage from 'pages/Suppliers';
import CategoriesPage from 'pages/Categories';
import ProductsPage from 'pages/Products';
import Button from 'components/Button';
import SupplyingsPage from 'pages/Supplyings';
import SalesControl from 'pages/SalesControl';

import { useRedirectToActiveLocation } from 'hooks/redirect';
import { useDolarValue } from 'hooks/useDolarValue';

const HomePage = () => {
    useRedirectToActiveLocation();

    const { dolarValue, notification, showNotification, updateDolarValue } = useDolarValue();

    const handleDolarChange = () => {
        let response = prompt('Ingrese el valor del dolar');

        if (response !== null) {
            if (isNaN(response) || response === '') {
                showNotification('error', 'El valor del dólar debe ser numérico', 3000);
            } else {
                updateDolarValue(response);
                window.location.reload();
            }
        }
    };

    return (
        <L.Wrapper>
            <L.Header>
                <Navbar />
            </L.Header>
            <L.MainWrapper>
                <L.Main>
                    <Switch>
                        <Route path='/control-de-ventas' component={SalesControl}></Route>
                        <Route path='/inventario'>Hola</Route>
                        <Route path='/deudas'>Hola</Route>
                        <Route path='/categorias' component={CategoriesPage} />
                        <Route path='/clientes' component={ClientsPage} />
                        <Route path='/productos' component={ProductsPage} />
                        <Route path='/ventas'>Hola</Route>
                        <Route path='/abastecimientos' component={SupplyingsPage} />
                        <Route path='/proveedores' component={SuppliersPage} />
                        <Route path='/usuarios' component={UsersPage} />
                    </Switch>
                </L.Main>
                <L.MainHeader>
                    <HeaderTitleContainer>
                        <Heading>{localStorage.getItem('activeLocation')}</Heading>
                    </HeaderTitleContainer>
                    <DolarValueContainer>
                        <h3>Tasa del dolar:</h3>
                        <span>
                            {(dolarValue && dolarValue.toLocaleString('es-VE')) || (
                                <span style={{ color: 'red' }}>No hay valor asignado</span>
                            )}
                        </span>
                        <Button onClick={handleDolarChange}>Editar</Button>
                    </DolarValueContainer>
                </L.MainHeader>
            </L.MainWrapper>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </L.Wrapper>
    );
};

export default HomePage;
