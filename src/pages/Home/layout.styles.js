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
    flex-direction: row;
    justify-content: space-between;
    flex: 0 1 50px;
    background: ${colors.primary};
    z-index: 1;

    @media (min-width: ${breakpoints.mobile}) {
        border-bottom: 2px solid white;
    }
`;

export const HeaderTitleContainer = styled.div`
    color: white;
    margin-left: 10px;
    height: 100%;
    justify-content: center;
`;

export const DolarValueContainer = styled.div`
    margin-right: 15px; 
    justify-content: center;

    span {
        color: ${colors.secondary}
    }

    h3 {
    color: white;
        margin: 0;
    }

`

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
