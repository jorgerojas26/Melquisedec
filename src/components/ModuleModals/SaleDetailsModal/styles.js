import styled from 'styled-components';

import { colors } from 'styles/theme';

export const TableContainer = styled.div`
    td {
        padding: 5px;
    }
    max-height: 150px;
    overflow: auto;
`;

export const MetadataContainer = styled.div`
    flex-direction: row;
    max-height: 160px;
    border-bottom: 1px solid ${colors.shadow};
    padding-bottom: 10px;
`;
export const ClientContainer = styled.fieldset`
    width: 50%;
    padding: 5px;
    overflow: auto;
`;

export const PaymentsContainer = styled.fieldset`
    display: grid;
    width: 50%;
    padding: 5px;
    overflow: auto;
`;

export const TotalContainer = styled.div`
    flex-direction: row;
    place-content: space-around;
    min-height: 100%;

    border-top: 1px solid ${colors.shadow};
`;

export const SaleInfoTotal = styled.div`
    flex-direction: row;
`;

export const DebtInfoTotal = styled.fieldset`
    display: grid;
    grid-template-columns: auto auto;
    gap: 5px;
    width: 100%;

    legend {
        color: ${colors.primary};
        font-size: 22px;
    }
`;

export const DebtLabel = styled.div`
    place-items: end;
`;

export const DebtValue = styled.div`
    flex-direction: row;
    gap: 10px;
    place-items: start;
`;

export const DebtOriginal = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-content: end;
`;
