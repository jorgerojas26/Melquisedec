import styled from 'styled-components';

import { breakpoints, colors } from 'styles/theme';

export const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    flex-direction: column;

    overflow-y: hidden;

    background: ${colors.brown};
    @media (min-width: ${breakpoints.mobile}) {
        flex-direction: row;
    }
`;

export const Header = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: sticky;
    max-height: 50px;
    background: ${colors.primary};

    z-index: 1;

    @media (min-width: ${breakpoints.mobile}) {
        position: relative;
        width: auto;
        max-height: 100%;
    }
`;

export const Main = styled.main`
    display: flex;
    flex-shrink: 1;
    flex-grow: 1;
    flex-direction: column-reverse;

    border-left: 2px solid white;
    background-image: url('../../assets/patterns/leaves-pattern.png');

    @media (min-width: ${breakpoints.mobile}) {
        flex-direction: column;
        padding-top: 0px;
    }
`;

export const MainHeader = styled.div`
    position: fixed;
    height: 50px;
    bottom: 0px;
    width: 100%;
    background: ${colors.primary};
    z-index: 1;

    @media (min-width: ${breakpoints.mobile}) {
        position: sticky;
        top: 0px;
        border-bottom: 2px solid white;
    }

    @media (min-width: ${breakpoints.laptop}) {
        height: 80px;
    }
`;

export const HeaderTitleContainer = styled.div`
    color: white;
    margin-left: 10px;
    height: 100%;
    justify-content: center;
`;

export const Heading = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    font-size: 24px;
    font-weight: 800;
`;

export const MainBodyWrapper = styled.div`
    flex-direction: row;
    width: 100%;
`;

export const MainBody = styled.div`
    height: calc(100vh - 50px - 50px);
    margin-bottom: 50px;
    flex-grow: 1;

    @media (min-width: ${breakpoints.mobile}) {
        height: calc(100vh - 80px);
        margin-bottom: 0px;
    }
`;

export const WidgetsContainer = styled.div`
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
        props.show &&
        props.children && {
            display: 'flex',
        }}

    ${(props) => {
        console.log(props);
    }}

    @media (min-width: ${breakpoints.mobile}) {
        top: 50px;
        right: 0px;
        bottom: 0px;
        max-width: 50%;
    }

    @media (min-width: ${breakpoints.laptop}) {
        top: 80px;
        max-width: 30%;
    }

    @media (min-width: ${breakpoints.desktop}) {
        top: 0px;
        position: relative;
    }
`;
