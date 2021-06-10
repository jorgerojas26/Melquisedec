import styled from 'styled-components';

import { colors, breakpoints } from 'styles/theme';

export const StyledFilterContainer = styled.div`
    position: sticky;
    left: 0;
    right: 100%;
    height: 50px;
    z-index: 2;
`;

export const TableContainer = styled.div`
    overflow: auto;
    max-height: calc(100% - 100px);
    @media (min-width: ${breakpoints.mobile}) {
        max-height: calc(100% - 50px);
    }
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
    width: 100%;
    padding-bottom: 5px;
    @media (min-width: ${breakpoints.mobile}) {
        border-bottom: 1px solid ${colors.shadow};
    }
`;

export const TD = styled.td`
    padding: 12px;
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

    background: ${colors.lightGray};
    color: black;
`;

export const TR = styled.tr`
    cursor: pointer;

    ${(props) =>
        props.active && {
            background: colors.primary + '!important',
            color: 'white',
        }}

    :nth-child(2n + 0) {
        background: rgba(0, 0, 0, 0.05);
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
    position: fixed;
    align-items: center;
    margin-top: 10px;
    bottom: 50px;
    width: 100%;

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
        position: sticky;
        bottom: 0;
        align-items: flex-end;
    }
`;
