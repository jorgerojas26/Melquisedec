import styled from 'styled-components';

import { colors } from 'styles/theme';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 0.3fr 1fr auto 0.8fr;
    grid-template-rows: 38px;

    font-size: 19px;

    * {
        border-radius: 0;
    }
`;

export const NameContainer = styled.div`
    background: ${colors.primary};
    color: white;
    place-content: center;
    place-items: center;
    padding: 0 5px;
`;

export const InputContainer = styled.div`
    > label {
        padding: 10px 0;
    }

    input {
        text-align: right;
    }

    select {
        height: 100%;
    }
`;

export const CurrencyContainer = styled.div`
    background: ${colors.primary};
    color: white;
    place-content: center;
    place-items: center;
    padding: 0 5px;
`;
