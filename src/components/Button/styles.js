import styled from 'styled-components';

export const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    cursor: pointer;
    background: none;
    border: none;

    box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px;

    min-width: 0px;
    min-height: 0px;

    :hover {
        opacity: 0.8;
    }

    span {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    svg {
        margin-right: 3px;
    }

    ${(props) => props.background && { background: props.background }}
    ${(props) => props.color && { color: props.color }}

    ${(props) => props.disabled && { background: 'lightGrey', color: 'black !important', cursor: 'not-allowed' }}
`;
