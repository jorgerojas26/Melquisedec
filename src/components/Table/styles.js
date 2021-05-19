import styled from 'styled-components';

import { colors } from 'styles/theme';

export const StyledTable = styled.table`
    width: 100%;
    max-height: 100%;
    text-align: center;

    border-collapse: collapse;
`;

export const TD = styled.td`
    padding: 12px;
    font-size: 17px;
`;

export const TH = styled.th`
    padding: 5px;
    font-weight: 700;
    font-size: 19px;
    border-bottom: 1px solid black;
`;

export const THChildrenWrapper = styled.div`
    display: flex;
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

export const TFoot = styled.tfoot`
    // custom css goes here
`;

export const TBody = styled.tbody``;

export const StyledLoadingContainer = styled.div`
    width: 100%;
    text-align: center;
    border: 1px solid black;
`;
