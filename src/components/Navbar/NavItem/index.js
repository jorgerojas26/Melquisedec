import { NavLink, NavLinkContentWrapper, IconContainer, NavLinkTextContainer, NavLinkText } from '../styles';

import { colors } from 'styles/theme';

const NavItem = ({ to, Icon, title, active, ...rest }) => {
    const activeItem = localStorage.getItem('activeLocation');

    const handleClick = (elementURL) => {
        localStorage.setItem('activeLocation', elementURL);
    };

    return (
        <NavLink to={to} onClick={() => handleClick(to)} {...rest}>
            <NavLinkContentWrapper className={activeItem === to ? 'active' : ''}>
                <IconContainer>
                    <Icon
                        size='28px'
                        weight={activeItem === to ? 'fill' : 'regular'}
                        color={activeItem === to ? colors.secondary : 'white'}
                    />
                </IconContainer>
                <NavLinkTextContainer>
                    <NavLinkText>{title}</NavLinkText>
                </NavLinkTextContainer>
            </NavLinkContentWrapper>
        </NavLink>
    );
};

export default NavItem;
