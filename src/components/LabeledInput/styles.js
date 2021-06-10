import styled from 'styled-components';
import { colors } from 'styles/theme';

export const StyledMainWrapper = styled.label`
    display: flex;
    flex-direction: column;
    position: relative;

    justify-content: flex-end;

    border-color: rgb(196, 207, 214);
    border: 1px solid #999;
    border-radius: 4px;
    padding: 30px 0 10px 0;

    background: white;

    min-width: 0px;
    min-height: 0px;
    max-width: 100%;
    max-height: 100%;

    overflow-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre-wrap;

    > label.active {
        font-size: 14px;
        top: 5px;
        left: 5px;
    }

    :focus-within {
        box-shadow: 0 0 0 3px ${colors.secondary};
        border-color: transparent;
        > label {
            font-size: 14px;
            top: 5px;
            left: 5px;
            color: ${colors.secondary};
        }
    }

    ${(props) =>
        props.errorborder &&
        `
        box-shadow: 0 0 0 3px red;

    `}

    ${(props) => {
        if (props.file) {
            return `
            background: ${colors.shadow};
            cursor: pointer;
            label {
            font-size: 12px;
            top: 2px;
            left: 2px;
            }
            `;
        }
    }}
`;

export const StyledInput = styled.input`
    margin: 0;
    min-width: 0px;
    min-height: 0px;

    height: 100%;
    border: 0;
    outline: 0;
    font-size: 18px;
    padding: 0 10px;

    ${(props) => props.capitalize && { textTransform: 'capitalize' }}
`;

export const StyledLabel = styled.label`
    min-width: 0px;
    min-height: 0px;

    color: rgb(91, 112, 131);
    position: absolute;
    pointer-events: none;
    top: 15px;
    left: 10px;

    font-size: 16px;
    font-weight: 800;
    transition: all 0.2s;
`;
