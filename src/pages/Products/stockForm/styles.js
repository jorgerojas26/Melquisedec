import styled from 'styled-components';

export const Variants = styled.div`
    font-size: 19px;
`;

export const Header = styled.header`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;

    strong:first-child {
        grid-column: 1/3;
    }

    > * {
        border: 1px solid grey;
        padding: 5px 0;
    }
`;
export const VariantContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    text-align: center;
    label:first-child {
        grid-column: 1/3;
    }

    > * {
        border: 1px solid grey;
        padding: 5px 0;
    }
    input {
        text-align: center;
        font-size: 14px;
    }
`;
export const Label = styled.label`
    text-transform: capitalize;
`;

export const StockInfo = styled.div`
    flex-direction: row;
    justify-content: space-between;
`;

export const FreeStock = styled.label`
    padding: 5px 0;
    span {
        color: green;
    }
`;

export const TotalStock = styled.label`
    padding: 5px 0;
`;
