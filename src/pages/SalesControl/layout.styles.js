import styled from 'styled-components';
import { colors, breakpoints } from 'styles/theme';

export const MainContainer = styled.div`
    height: 100%;
    border: 1px solid black;
    overflow-y: auto;
`;

export const MetadataContainer = styled.div`
    flex: 0 0 40%;
    border-top: 1px solid black;

    @media (min-width: ${breakpoints.laptop}) {
        flex-direction: row;
        flex: 0 0 auto;
        max-height: 22%;
    }
`;

export const InvoiceFormContainer = styled.div`
    flex: 1 0 60%;
    overflow: auto;
    max-height: 100%;
`;

export const ClientContainer = styled.div`
    flex: 0 0 auto;
    border-bottom: 1px solid black;
    gap: 5px;
    padding-bottom: 10px;

    h2 {
        margin: 5px 0 0 0;
    }

    @media (min-width: ${breakpoints.mobile}) {
        padding: 10px;
    }

    @media (min-width: ${breakpoints.laptop}) {
        flex: 1 0 50%;
        border-bottom: none;
        border-right: 1px solid black;
    }
`;

export const PaymentsContainer = styled.div`
    flex: 1 1 50%;

    border-top: 1px solid black;
    gap: 5px;
    overflow: auto;
    padding-bottom: 10px;

    h2 {
        margin: 5px 0 0 0;
    }

    @media (min-width: ${breakpoints.mobile}) {
        padding: 10px;
    }

    @media (min-width: ${breakpoints.laptop}) {
        border-top: none;
    }
`;

export const InvoiceTotalContainer = styled.div`
    flex: 0 1 auto;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    margin-bottom: 5px;
    width: 100%;

    font-size: 16px;
    font-weight: 800;
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
    overflow: auto;

    margin-bottom: 10px;

    td {
        padding: 5px;
    }
`;

export const FooterContainer = styled.div`
    flex-direction: row-reverse;
    justify-content: space-between;

    button {
        padding: 5px 10px;
        color: white;
        font-size: 16px;
        background: ${(props) => props.color || 'transparent'};
    }
`;

export const ActionsContainer = styled.div`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin: 5px 0;

    button {
        padding: 10px;
    }
`;

export const TotalContainer = styled.fieldset`
    display: grid;
    grid-template-columns: 1fr auto;

    place-items: end;

    padding: 2px;
    min-height: 100%;
    width: 100%;

    legend {
        color: ${colors.primary};
    }

    label {
        padding: 5px;
    }

    @media (min-width: ${breakpoints.tablet}) {
        font-size: 22px;
    }
`;
