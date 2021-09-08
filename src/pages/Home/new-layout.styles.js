import styled from 'styled-components';

import { breakpoints, colors } from 'styles/theme';

export const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 50px 1fr;
    width: 100%;
    height: 100%;
    @media (min-width: ${breakpoints.mobile}) {
        grid-template-rows: 1fr;
        grid-template-columns: 70px 1fr;
    }

    @media (min-width: ${breakpoints.laptop}) {
        grid-template-columns: 275px 1fr;
    }
`;

export const Header = styled.header``;

export const TitleContainer = styled.div``;

export const MainWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 50px;

    @media (min-width: ${breakpoints.mobile}) {
        grid-template-rows: 50px 1fr;
    }
`;

export const MainHeader = styled.div`
    align-items: center;
    justify-content: center;
    background: ${colors.primary};

    border-top: 2px solid ${colors.lightPrimary};

    @media (min-width: ${breakpoints.mobile}) {
        grid-row: 1;
        border-bottom: 2px solid ${colors.lightPrimary};
        border-top: none;
    }

    @media (min-width: ${breakpoints.tablet}) {
        flex-direction: row;
        justify-content: space-between;
    }
`;

export const Main = styled.main`
    overflow: hidden;
    background-image: url('../../assets/patterns/leaves-pattern.png');
`;
