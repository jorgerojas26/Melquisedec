import { colors } from 'styles/theme';

import { MainWrapper, NavWrapper, LogoContainer, NavContainer, Nav } from './styles';

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
        <MainWrapper>
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
                        <NavItem Icon={Bookmark} title='Categorias' to='/categorias' dissapearonmobile />
                        <NavItem Icon={Users} title='Clientes' to='/clientes' />
                        <NavItem Icon={Barcode} title='Productos' to='/productos' />
                        <NavItem Icon={ShoppingCartSimple} title='Ventas' to='/ventas' dissapearonmobile />
                        <NavItem Icon={Package} title='Abastecimientos' to='/abastecimientos' dissapearonmobile />
                        <NavItem Icon={IdentificationCard} title='Proveedores' to='/proveedores' dissapearonmobile />
                        <NavItem Icon={User} title='Usuarios' to='/usuarios' dissapearonmobile />
                    </Nav>
                </NavContainer>
            </NavWrapper>
        </MainWrapper>
    );
};

export default Navbar;
