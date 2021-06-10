import styled from 'styled-components';

import { colors, breakpoints } from 'styles/theme';

import { NavLink as Link } from 'react-router-dom';

export const WidthManager = styled.div`
    display: flex;
    width: 100%;

    @media (min-width: ${breakpoints.mobile}) {
        width: 68px;
    }

    @media (min-width: ${breakpoints.laptop}) {
        width: 275px;
    }
`;

export const MainWrapper = styled.div`
    display: flex;

    @media (min-width: ${breakpoints.mobile}) {
        width: inherit;
        height: 100%;
        position: fixed;
        top: 0;
    }
`;

export const NavProfileSeparator = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    position: relative;

    @media (min-width: ${breakpoints.mobile}) {
        width: 68px;
        overflow-y: auto;
        justify-content: space-between;
        height: 100%;
        padding-left: 4px;
        padding-right: 4px;
        flex-direction: column;
    }

    @media (min-width: ${breakpoints.laptop}) {
        width: 275px;
        padding-left: 11px;
        padding-right: 11px;
    }
`;

export const NavWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    position: relative;

    @media (min-width: ${breakpoints.mobile}) {
        flex-direction: column;
    }
`;

export const AccountMenuContainer = styled.div``;

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
    margin: 0 auto;

    @media (min-width: ${breakpoints.mobile}) {
        margin-top: 2px;
        margin-bottom: 4px;
        align-items: center;
    }
`;

export const Nav = styled.nav`
    display: flex;
    justify-content: center;
    max-height: 16vh;
    height: 3.5rem;

    width: 100%;

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

    user-select: none;
    pointer-events: auto;
    online-style: none;
    text-decoration: none;
    cursor: pointer;

    justify-content: center;
    align-items: center;

    border-bottom: 2px solid rgba(0, 0, 0, 0);

    cursor: pointer;
    outline-style: none;

    @media (min-width: ${breakpoints.mobile}) {
        width: 100%;
    }

    @media (min-width: ${breakpoints.laptop}) {
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
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
`;

export const NavLinkText = styled.span`
    overflow-wrap: break-word;
    min-width: 0px;
`;

export const NavLinkContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 100%;
    padding: 11px;
    transition-property: background-color, box-shadow;
    transition-duration: 0.2s;

    :hover {
        background: ${colors.extraLightPrimary};
        color: white;
    }

    &.active {
        > ${IconContainer} svg {
            fill: ${colors.secondary};
        }

        > ${NavLinkTextContainer} {
            color: ${colors.secondary};
        }
    }
`;

export const ProfileMenuWrapper = styled.div`
    display: none;

    @media (min-width: ${breakpoints.mobile}) {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 11px 0;
    }
`;

export const ProfileMenuContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    transition-property: background-color, box-shadow;
    transition-duration: 0.2s;
    border-radius: 9999px;
    cursor: pointer;
    padding: 11px;
    :hover {
        background: ${colors.lightPrimary};
    }

    max-width: 100%;
`;

export const AvatarContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 38px;
    min-height: 38px;
    background: grey;
    border-radius: 9999px;
`;

export const UserIDWrapper = styled.div`
    display: none;
    flex-direction: column;
    flex-shrink: 1;
    min-width: 0px;

    @media (min-width: ${breakpoints.laptop}) {
        display: flex;
    }
`;
export const UserInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    margin: 0 11px;
`;

export const UserFullNameContainer = styled.div`
    display: inline;

    font-size: 14px;
    font-weight: 700;

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    overflow-wrap: break-word;

    min-width: 0px;
`;
export const UsernameContainer = styled.div`
    display: inline;

    font-size: 14px;
    font-weight: 400;
    color: ${colors.darkGray};

    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    overflow-wrap: break-word;

    min-width: 0px;
`;

export const UserFullNameText = styled.span``;

export const UsernameText = styled.span``;

export const ThreeDotsIconContainer = styled.div`
    display: none;
    flex-grow: 1;
    align-items: flex-end;

    @media (min-width: ${breakpoints.laptop}) {
        display: flex;
    }
`;
