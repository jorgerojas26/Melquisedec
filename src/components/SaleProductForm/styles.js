import styled from 'styled-components';
import { colors } from 'styles/theme';
import NumberInput from 'react-number-format';

export const FormContainer = styled.form`
    display: grid;
    grid-template-columns: 1fr 10% auto;
    text-align: center;
    gap: 10px;
    padding: 10px;

    button {
        border-radius: 5px;
        color: white;
        font-size: 16px;
        background: ${colors.primary};
    }

    h4 {
        margin: 0;
    }
`;

export const QuantityInput = styled(NumberInput)`
    border-radius: 5px;
    border: 1px solid grey;

    :focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px ${colors.secondary};
    }
`;
