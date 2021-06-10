import { Wrapper, Header, Main, MainHeader, HeaderTitleContainer, Heading, DolarValueContainer, MainBodyWrapper, MainBody } from './layout.styles';

import { Switch, Route } from 'react-router-dom';

import Navbar from 'components/Navbar';

import ClientsPage from 'pages/Clients';
import UsersPage from 'pages/Users';
import SuppliersPage from 'pages/Suppliers';
import CategoriesPage from 'pages/Categories';
import ProductsPage from 'pages/Products';

import { useRedirectToActiveLocation } from 'hooks/redirect';

const HomePage = () => {
    useRedirectToActiveLocation();
    return (
        <Wrapper>
            <Header>
                <Navbar />
            </Header>
            <Main>
                <MainHeader>
                    <HeaderTitleContainer>
                        <Heading>{localStorage.getItem('activeLocation')}</Heading>
                    </HeaderTitleContainer>
                    <DolarValueContainer>
                        <h3>
                            Valor del dolar: <span>{localStorage.getItem('dolarValue') || 'No hay valor definido'}</span>
                        </h3>
                    </DolarValueContainer>
                </MainHeader>
                <MainBodyWrapper>
                    <MainBody>
                        <Switch>
                            <Route path='/control-de-ventas'>Hola</Route>
                            <Route path='/inventario'>Hola</Route>

                            <Route path='/deudas'>Hola</Route>
                            <Route path='/categorias' component={CategoriesPage} />
                            <Route path='/clientes' component={ClientsPage} />
                            <Route path='/productos' component={ProductsPage} />
                            <Route path='/ventas'>Hola</Route>
                            <Route path='/abastecimientos'>Hola</Route>
                            <Route path='/proveedores' component={SuppliersPage} />
                            <Route path='/usuarios' component={UsersPage} />
                        </Switch>
                    </MainBody>
                </MainBodyWrapper>
            </Main>
        </Wrapper>
    );
};

export default HomePage;
