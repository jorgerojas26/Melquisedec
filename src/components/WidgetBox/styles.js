import styled from 'styled-components';

import { colors, breakpoints } from 'styles/theme';

export const Container = styled.div`
    border-left: 1px solid ${colors.lightGray};

    display: none;
    position: fixed;
    top: 50%;
    bottom: 50px;
    width: 100%;
    background: ${colors.extraLightGray};
    z-index: 2;
    box-shadow: ${colors.shadow} 0px 0px 15px, ${colors.shadow} 0px 0px 3px 1px;

    ${(props) =>
        props.show && {
            display: 'flex',
        }}

    @media (min-width: ${breakpoints.mobile}) {
        top: 152px;
        right: 0px;
        bottom: 0px;
        max-width: 50%;
    }

    @media (min-width: ${breakpoints.laptop}) {
        top: 180px;
        max-width: 30%;
    }

    @media (min-width: ${breakpoints.desktop}) {
        display: flex;
        position: static;
    }
`;

export const CloseButtonWrapper = styled.div`
    flex-direction: row;
    justify-content: flex-start;
    height: 30px;

    @media (min-width: ${breakpoints.desktop}) {
        display: none;
    }
`;
