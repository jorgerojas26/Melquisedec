import styled from 'styled-components';

import { colors, breakpoints } from 'styles/theme';

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
`;

export const SeparatorWrapper = styled.div`
    height: 100%;
    width: 100%;
    flex-direction: row;
`;

export const ContentContainer = styled.div`
    height: 100%;
    max-width: 100%;
    flex-grow: 1;
    align-items: center;

    @media (min-width: ${breakpoints.mobile}) {
        overflow-x: auto;
    }
`;

export const WidgetsContainer = styled.div`
    height: 100%;
    border-left: 1px solid ${colors.lightGray};

    display: none;
    position: fixed;
    top: 50%;
    width: 100%;
    background: ${colors.extraLightGray};
    z-index: 2;
    box-shadow: ${colors.shadow} 0px 0px 15px, ${colors.shadow} 0px 0px 3px 1px;

    ${(props) =>
        props.show && {
            display: 'flex',
        }}

    transition: visibility 2s, opacity 0.5s linear;

    @media (min-width: ${breakpoints.mobile}) {
        top: 50px;
        right: 0px;
        max-width: 50%;
    }

    @media (min-width: ${breakpoints.laptop}) {
        top: 80px;
        max-width: 30%;
    }

    @media (min-width: ${breakpoints.desktop}) {
        display: flex;
        flex-grow: 1;

        position: relative;
        top: 0;
    }
`;

export const FilterBarContainer = styled.div`
    height: 50px;
    border: 1px solid black;
`;

export const TableContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: auto;
    border-bottom: 1px dotted white;
`;

export const TableFilterContainer = styled.div`
    position: sticky;
    top: 0px;
    width: 100%;
    height: 40px;
    z-index: 1;
`;
