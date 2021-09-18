import styled from 'styled-components';

import { breakpoints, colors } from 'styles/theme';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 50px 1fr 50px;
    height: 100vh;
    width: 100vw;

    background: pink;

    @media (min-width: ${breakpoints.mobile}) {
        grid-template-columns: minmax(70px, 270px) 1fr;
    }
`;

export const Header = styled.header`
    position: sticky;
    top: 0;
    height: 50px;

    background: ${colors.primary};

    z-index: 1;

    @media (min-width: ${breakpoints.mobile}) {
        display: flex;
        height: 100vh;
    }
`;

export const Main = styled.main`
    display: flex;
    background: blue;

    flex-direction: column-reverse;

    background-image: url('../../assets/patterns/leaves-pattern.png');

    @media (min-width: ${breakpoints.mobile}) {
        flex-direction: column;
    }
`;

export const MainHeader = styled.div`
    justify-content: center;
    align-items: center;

    position: sticky;
    bottom: 0;
    height: 50px;

    background: ${colors.primary};
    z-index: 1;

    @media (min-width: ${breakpoints.mobile}) {
        flex-direction: row;
        border-bottom: 2px solid ${colors.lightPrimary};
        top: 0;
        bottom: auto;
    }

    @media (min-width: ${breakpoints.tablet}) {
        justify-content: space-between;
    }
`;

export const HeaderTitleContainer = styled.div`
    display: none;
    color: white;
    margin-left: 10px;
    justify-content: center;

    @media (min-width: ${breakpoints.tablet}) {
        display: block;
    }
`;

export const DolarValueContainer = styled.div`
    flex-direction: row;
    margin-right: 15px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    span {
        color: white;
        font-size: 20px;
        font-weight: 700;
    }

    h3 {
        color: ${colors.smokyBlack};
        margin: 0;
    }
`;

export const Heading = styled.span`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 24px;
    font-weight: 800;
`;

export const MainBody = styled.div`
    @media (min-width: ${breakpoints.mobile}) {
    }
`;
