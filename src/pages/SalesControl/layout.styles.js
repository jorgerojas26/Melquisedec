import styled from 'styled-components';
import { breakpoints } from 'styles/theme';

export const MainContainer = styled.div`
    flex: 1 1 100%;
    border: 1px solid black;
    overflow-y: auto;
`;

export const InvoiceFormContainer = styled.div`
    flex: 1 1 100%;
`;

export const InvoiceTotalContainer = styled.div`
    flex: 1 0 auto;
    justify-content: space-between;
`;

export const MetadataContainer = styled.div`
    flex: 0 1 auto;
    max-height: 300px;

    h2 {
        font-size: 16px;
    }

    @media (min-width: ${breakpoints.tablet}) {
        flex-direction: row;

        h2 {
            font-size: 24px;
        }
    }
`;

export const ClientContainer = styled.div`
    flex: 0 1 auto;

    border-bottom: 1px solid black;

    @media (min-width: ${breakpoints.tablet}) {
        border-right: 1px solid black;
        border-bottom: 0;
        flex: 1;
    }
`;

export const ClientNameContainer = styled.div`
    flex: 1;
    display: none;

    @media (min-width: ${breakpoints.mobile}) {
        display: flex;
    }
`;

export const ClientPhoneNumberContainer = styled.div`
    flex: 1;
    display: none;

    @media (min-width: ${breakpoints.mobile}) {
        display: flex;
    }
`;

export const PaymentsContainer = styled.div`
    flex: 1;
    max-height: 250px;
    overflow: auto;
`;

export const OrderDetailsContainer = styled.div`
    flex: 1;

    overflow-y: auto;

    border-top: 1px solid black;

    @media (min-width: ${breakpoints.mobile}) {
        flex-direction: row;
    }
`;

export const ProductFormContainer = styled.div``;

export const TableContainer = styled.div`
    flex: 1 1 100%;

    margin-bottom: 10px;

    td {
        padding: 5px;
    }
`;

export const FooterContainer = styled.div`
    margin: 10px;
    gap: 10px;

    button {
        padding: 5px 20px;
        color: white;
        font-size: 16px;
        background: ${(props) => props.color || 'transparent'};
    }

    @media (min-width: ${breakpoints.tablet}) {
        flex-direction: row-reverse;
    }
`;

export const ActionsContainer = styled.div`
    gap: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
`;

export const TotalContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    justify-items: end;

    font-size: 16px;
    font-weight: 800;

    label {
        padding: 5px;
    }

    @media (min-width: ${breakpoints.tablet}) {
        font-size: 26px;
    }
`;
