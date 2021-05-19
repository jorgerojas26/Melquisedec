import { useState } from 'react';
import { useActiveWidget } from 'hooks/activeWidget';

import {
    Wrapper,
    Header,
    Main,
    MainHeader,
    HeaderTitleContainer,
    Heading,
    MainBodyWrapper,
    MainBody,
    WidgetsContainer,
} from './layout.styles';

import { Switch, Route } from 'react-router-dom';

import Navbar from 'components/Navbar';
import ClientsPage from 'pages/Clients';

import { useRedirectToActiveLocation } from 'hooks/redirect';

const HomePage = () => {
    useRedirectToActiveLocation();

    const [activeRoute, setActiveRoute] = useState(null);
    const [showWidget, setShowWidget] = useState(null);

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
                </MainHeader>
                <MainBodyWrapper>
                    <MainBody>
                        <Switch>
                            <Route path='/control-de-ventas'>Hola</Route>
                            <Route path='/inventario'>Hola</Route>
                            <Route path='/reportes'>Hola</Route>
                            <Route path='/deudas'>Hola</Route>
                            <Route path='/categorias'>Hola</Route>
                            <Route
                                path='/clientes'
                                render={() => {
                                    setActiveRoute('clientes');
                                    return <ClientsPage />;
                                }}
                            />
                            <Route path='/productos'>Hola</Route>
                            <Route path='/ventas'>Hola</Route>
                            <Route path='/abastecimientos'>Hola</Route>
                            <Route path='/proveedores'>Hola</Route>
                            <Route path='/usuarios'>Hola</Route>
                        </Switch>
                    </MainBody>
                    <WidgetsContainer show={true}>
                        <Switch>
                            <Route path='/clientes'>WIDGETSSSSSS</Route>
                        </Switch>
                    </WidgetsContainer>
                </MainBodyWrapper>
            </Main>
        </Wrapper>
    );
};

export default HomePage;
