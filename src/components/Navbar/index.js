import { colors } from 'styles/theme';

import { WidthManager, MainWrapper, NavProfileSeparator, NavWrapper, LogoContainer, NavContainer, Nav } from './styles';

import {
    Package,
    Barcode,
    IdentificationCard,
    Users,
    User,
    Bookmark,
    FileMinus,
    ArchiveBox,
    ClipboardText,
    ShoppingCart,
    ShoppingCartSimple,
} from 'phosphor-react';

import Banner from 'components/shared/Banner';
import NavItem from 'components/Navbar/NavItem';

const Navbar = () => {
    return (
        <WidthManager>
            <MainWrapper>
                <NavProfileSeparator>
                    <NavWrapper>
                        <LogoContainer>
                            <Banner height='80px' fill={colors.secondary} />
                        </LogoContainer>
                        <NavContainer>
                            <Nav>
                                <NavItem Icon={ShoppingCart} title='Control De Ventas' to='/control-de-ventas' />
                                <NavItem Icon={ArchiveBox} title='Inventario' to='/inventario' />
                                <NavItem Icon={ClipboardText} title='Reportes' to='/reportes' />
                                <NavItem Icon={FileMinus} title='Deudas' to='/deudas' />
                                <NavItem Icon={Bookmark} title='Categorias' data-dissapearOnMobile to='/categorias' />
                                <NavItem Icon={Users} title='Clientes' to='/clientes' />
                                <NavItem Icon={Barcode} title='Productos' data-dissapearOnMobile to='/productos' />
                                <NavItem Icon={ShoppingCartSimple} title='Ventas' data-dissapearOnMobile to='/ventas' />
                                <NavItem Icon={Package} title='Abastecimientos' data-dissapearOnMobile to='/abastecimientos' />
                                <NavItem Icon={IdentificationCard} title='Proveedores' data-dissapearOnMobile to='/proveedores' />
                                <NavItem Icon={User} title='Usuarios' data-dissapearOnMobile to='/usuarios' />
                            </Nav>
                        </NavContainer>
                    </NavWrapper>
                </NavProfileSeparator>
            </MainWrapper>
        </WidthManager>
    );
};

export default Navbar;
