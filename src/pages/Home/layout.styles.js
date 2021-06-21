import styled from 'styled-components';

import { breakpoints, colors } from 'styles/theme';

export const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    flex-direction: column;
    overflow: hidden;

    background: ${colors.brown};
    @media (min-width: ${breakpoints.mobile}) {
        flex-direction: row;
    }
`;

export const Header = styled.header`
    position: sticky;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 1 50px;

    background: ${colors.primary};

    z-index: 1;
`;

export const Main = styled.main`
    display: flex;
    flex: 1;
    flex-direction: column-reverse;

    overflow: hidden;

    background-image: url('../../assets/patterns/leaves-pattern.png');

    @media (min-width: ${breakpoints.mobile}) {
        flex-direction: column;
        overflow: hidden;
    }
`;

export const MainHeader = styled.div`
    justify-content: center;
    align-items: center;
    flex: 0 1 50px;

    background: ${colors.primary};
    z-index: 1;

    @media (min-width: ${breakpoints.mobile}) {
        flex-direction: row;
        border-bottom: 2px solid white;
    }

    @media (min-width: ${breakpoints.table}) {
        justify-content: space-between;
    }
`;

export const HeaderTitleContainer = styled.div`
    display: none;
    color: white;
    margin-left: 10px;
    height: 100%;
    justify-content: center;

    @media (min-width: ${breakpoints.table}) {
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
        margin-left: 10px;
        font-size: 19px;
        font-weight: 700;
    }

    h3 {
        display: none;
        color: white;
        margin: 0;
    }

    button {
        background: ${colors.secondary};
        border-radius: 16px;
        padding: 10px 20px;
        color: white;
        font-weight: 600;
        font-size: 14px;
    }
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
    flex: 1;
`;

export const MainBody = styled.div`
    flex: 1;
`;
