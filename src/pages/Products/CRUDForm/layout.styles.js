import styled from 'styled-components';

import { colors, breakpoints } from 'styles/theme';

export const GeneralInfoContainer = styled.div`
    flex-direction: row;
    gap: 10px;
    margin-bottom: 15px;
`;

export const VariantsContainer = styled.div`
    flex: 1;
    gap: 10px;
`;

export const InputsWrapper = styled.div`
    flex-direction: row;
    padding-bottom: 10px;
    border-bottom: 1px solid ${colors.shadow};
    gap: 10px;

    @media (max-width: ${breakpoints.mobile}) {
        flex-direction: column;
    }
`;

export const InputsContainer = styled.div`
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
    gap: 10px;

    > div {
        flex-basis: calc(50% - 10px);
    }
`;

export const FileInputContainer = styled.div`
    flex: 0 1 150px;

    label {
        flex: 1;
        > label {
            overflow: hidden;
            white-space: pre-wrap;
            text-overflow: ellipsis;
            max-width: 100%;
        }
    }
    input {
        display: none;
    }
`;
export const InputContainer = styled.div`
    flex: 1;
`;

export const VariantButtonContainer = styled.div`
    align-items: center;
    justify-content: flex-end;
    gap: 10px;

    button {
        background: ${(props) => (props.color ? props.color : 'transparent')};
        flex: 0 1 40px;
        border-radius: 4px;
        color: white;

        svg {
            margin: 0;
        }
    }
`;

export const ProductImageContainer = styled.div`
    flex: 0 1 100%;

    background-image: url(${(props) => props.url});
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    background-size: 48px;
`;
