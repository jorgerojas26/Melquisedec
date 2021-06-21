import styled from 'styled-components';

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
    display: grid;
    grid-template-columns: 4fr 2fr 0.5fr;
    grid-auto-columns: auto;
    gap: 10px;
`;

export const InputsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    gap: 8px;
    div {
        margin: 0;
    }
    label {
        > label.active {
            font-size: 12px;
        }
    }
`;

export const FileInputContainer = styled.div`
    label {
        height: 100%;
        > label {
            overflow: hidden;
            white-space: pre-wrap;
            text-overflow: ellipsis;
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
