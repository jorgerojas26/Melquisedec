import styled from 'styled-components';

import { colors, breakpoints } from 'styles/theme';

export const StyledFilterContainer = styled.div`
    flex: 1 0 50px;
`;

export const TableContainer = styled.div`
    max-height: ${(props) => props.maxHeight || '500px'};
    overflow: auto;
`;

export const StyledLoadingContainer = styled.div`
    align-items: center;
    position: absolute;
    top: 50%;
    left: 0px;
    right: 0px;

    font-size: 22px;

    border: 1px solid black;

    background: ${colors.primary};
    color: white;
    z-index: 1;

    ${(props) =>
        !props.data && {
            position: 'static',
        }}
`;

export const StyledNoDataContainer = styled.div`
    align-items: center;
    font-size: 22px;
    border: 1px solid black;
    color: red;
`;
export const StyledTable = styled.table`
    text-align: center;
    border-collapse: collapse;
    padding-bottom: 5px;

    @media (min-width: ${breakpoints.mobile}) {
        border-bottom: 1px solid ${colors.shadow};
    }
`;

export const TD = styled.td`
    padding: 10px;
    font-size: 17px;

    ${(props) =>
        props.capitalize && {
            textTransform: 'capitalize',
        }}
`;

export const TH = styled.th`
    padding: 5px;
    font-weight: 700;
    font-size: 19px;
    border-bottom: 1px solid black;

    position: sticky;
    top: 0px;

    background: ${colors.smokyBlack};
    color: white;
`;

export const TR = styled.tr`
    cursor: pointer;

    ${(props) =>
        props.active && {
            background: colors.primary + '!important',
            color: 'white',
        }}

    ${(props) =>
        props.theme === 'dark' && {
            background: colors.black,
            color: 'white',
        }}

    :nth-child(2n + 0) {
        background: ${(props) => (props.theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : colors.smokyBlack)};
    }

    :hover {
        background: ${colors.lightPrimary};
        color: white;
    }
`;

export const THead = styled.thead``;

export const TFoot = styled.tfoot``;

export const TBody = styled.tbody``;

export const PaginationContainer = styled.div`
    align-items: center;
    margin-top: 10px;
    flex: 1 0 50px;

    > ul,
    li {
        display: flex !important;
        flex-direction: row;
        padding: 0;
        margin: 0;
        height: 50px;
    }

    > ul li {
        background: ${colors.lightGray};
        font-weight: 700;
        cursor: pointer;

        :hover {
            background: ${colors.lightPrimary};
        }

        &.active {
            background: ${colors.primary};
        }
    }

    > ul a {
        display: flex;
        padding: 0px 20px;
        align-items: center;
        justify-content: center;
        text-align: center;
        border: 1px solid black;
        border-radius: 4px;
    }

    @media (min-width: ${breakpoints.mobile}) {
        align-items: flex-end;
    }
`;
