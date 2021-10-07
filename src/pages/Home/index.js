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
import SupplyingsPage from 'pages/Supplyings';
import SalesControl from 'pages/SalesControl';
import CurrenciesPage from 'pages/Currencies';
import SalesPage from 'pages/Sales';
import DebtsPage from 'pages/Debts';
import ReportsPage from 'pages/Reports';

import { useRedirectToActiveLocation } from 'hooks/redirect';
import { useCurrencyRates } from 'hooks/useCurrencyRates';

const HomePage = () => {
    useRedirectToActiveLocation();

    const { currencyRates, notification } = useCurrencyRates(true);

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
                        <Route path='/reportes' component={ReportsPage} />
                        <Route path='/deudas' component={DebtsPage} />
                        <Route path='/categorias' component={CategoriesPage} />
                        <Route path='/clientes' component={ClientsPage} />
                        <Route path='/productos' component={ProductsPage} />
                        <Route path='/ventas' component={SalesPage} />
                        <Route path='/abastecimientos' component={SupplyingsPage} />
                        <Route path='/proveedores' component={SuppliersPage} />
                        <Route path='/usuarios' component={UsersPage} />
                        <Route path='/tasas-de-cambio' component={CurrenciesPage} />
                        <Route path='/dinero' />
                    </Switch>
                </L.Main>
                <L.MainHeader>
                    <HeaderTitleContainer>
                        <Heading>{localStorage.getItem('activeLocation')}</Heading>
                    </HeaderTitleContainer>
                    <DolarValueContainer>
                        <h3>Tasa del dolar:</h3>
                        <span>
                            {(currencyRates &&
                                currencyRates['PAYMENT_VES'] &&
                                currencyRates['PAYMENT_VES'].value.toLocaleString() + ' Bs') ||
                                'No hay valor asignado'}
                        </span>
                    </DolarValueContainer>
                </L.MainHeader>
            </L.MainWrapper>
            {notification && <Notification type={notification.type}>{notification.text}</Notification>}
        </L.Wrapper>
    );
};

export default HomePage;
