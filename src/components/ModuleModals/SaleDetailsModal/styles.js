import styled from 'styled-components';

export const TableContainer = styled.div`
    td {
        padding: 5px;
    }
    max-height: 250px;
    overflow: auto;
`;

export const MetadataContainer = styled.div`
    flex-direction: row;
    max-height: 160px;
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
    justify-content: flex-end;
    align-items: flex-end;
`;
