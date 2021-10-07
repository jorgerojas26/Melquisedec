import styled from 'styled-components';

import { colors, breakpoints } from 'styles/theme';

import { NavLink as Link } from 'react-router-dom';

export const MainWrapper = styled.div`
    border-bottom: 2px solid ${colors.lightPrimary};
    height: 100%;
    background: ${colors.primary};

    @media (min-width: ${breakpoints.mobile}) {
        border-right: 2px solid ${colors.lightPrimary};
    }
`;

export const NavWrapper = styled.div`
    align-items: center;
`;

export const LogoContainer = styled.div`
    display: none;

    @media (min-width: ${breakpoints.laptop}) {
        display: flex;
        align-items: flex-start;
        margin-top: 10px;
    }
`;

export const NavContainer = styled.div`
    width: 100%;

    @media (min-width: ${breakpoints.mobile}) {
        margin-top: 2px;
        margin-bottom: 4px;
        align-items: center;
    }
`;

export const Nav = styled.nav`
    display: flex;
    justify-content: center;

    @media (min-width: ${breakpoints.mobile}) {
        flex-direction: column;
        align-items: center;
        height: 100%;
        max-height: 100%;
    }

    @media (min-width: ${breakpoints.laptop}) {
        align-items: flex-start;
    }
`;

export const NavLink = styled(Link)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;

    user-select: none;
    pointer-events: auto;
    outline-style: none;
    text-decoration: none;
    cursor: pointer;

    justify-content: center;
    align-items: center;

    border-bottom: 2px solid rgba(0, 0, 0, 0);

    cursor: pointer;
    outline-style: none;

    :hover {
        background: ${colors.extraLightPrimary};
        color: white;
    }

    ${(props) =>
        props.hide &&
        `
        @media (max-width: ${breakpoints.mobile}){
        display: none;
}
    `}
`;

export const IconContainer = styled.div`
    display: inline-block;

    ${(props) => {
        if (props.iconVariant) {
            return `

            > :nth-child(2){
                display: none;
            }

            @media (min-width: 988px){
                > :nth-child(1){
                display: none;
            }

            > :nth-child(2){
                display: flex;
            }

            }
            `;
        }
    }}
`;

export const NavLinkTextContainer = styled.div`
    line-height: 23px;
    font-size: 19px;
    font-weight: 700;

    min-width: 0px;
    max-width: 100%;

    overflow-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    color: white;

    margin: 0 15px 0 19px;

    display: none;

    @media (min-width: ${breakpoints.laptop}) {
        display: inline-block;
    }

    @media (max-height: ${breakpoints.tablet}) {
        font-size: 16px;
    }
`;

export const NavLinkText = styled.span`
    overflow-wrap: break-word;
    min-width: 0px;
`;

export const NavLinkContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    place-items: center;
    place-content: center;
    width: 100%;
    transition-property: background-color, box-shadow;
    transition-duration: 0.2s;

    &.active {
        > ${IconContainer} svg {
            fill: ${colors.secondary};
        }

        > ${NavLinkTextContainer} {
            color: ${colors.secondary};
        }
    }

    @media (min-width: ${breakpoints.laptop}) {
        place-items: start;
        place-content: start;
        padding: 2px;
    }

    @media (min-width: ${breakpoints.desktop}) {
        padding: 5px;
    }

    @media (min-width: ${breakpoints.bigScreen}) {
        padding: 10px;
    }
`;
