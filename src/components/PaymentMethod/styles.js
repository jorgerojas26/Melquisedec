import styled from 'styled-components';

import { colors } from 'styles/theme';

export const NameContainer = styled.button`
    border: none;
    color: white;

    place-content: center;
    place-items: center;

    padding: 0 5px;
    cursor: pointer;

    :hover {
        background: red !important;
    }
`;

export const InputContainer = styled.div`
    flex: 0 1 100%;

    input {
        text-align: right;
    }

    select {
        height: 100%;
    }
`;

export const CodeContainer = styled.div`
    flex: 0 1 auto;

    input {
        text-align: right;
    }
`;

export const SelectContainer = styled.div`
    select {
        height: 100%;
        cursor: pointer;
    }
`;

export const CurrencyContainer = styled.div`
    place-content: center;
    place-items: center;
    padding: 0 5px;
    pointer-events: none;
`;

export const Wrapper = styled.div`
    flex-direction: row;
    * {
        border-radius: 0;
    }

    ${SelectContainer} > select, ${NameContainer}, ${CurrencyContainer} {
        color: white;
        ${(props) => (props.ischange ? { background: colors.brown } : { background: colors.primary })}
    }
`;
