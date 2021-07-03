import styled from 'styled-components';

export const Wrapper = styled.div`
    div {
        flex-direction: row;
    }
    input,
    div {
        text-transform: capitalize;
    }
`;

export const SuggestionBox = styled.div`
    display: ${(props) => (props.shouldOpen ? 'flex' : 'none')};
    position: absolute;
    padding: 5px;
    top: 100%;
    max-height: 100px;
    width: 100%;
    z-index: 1;
    overflow-y: auto;
    border-radius: 4px;
    box-shadow: rgba(101 119 134 / 20%) 0px 0px 15px, rgba(101 119 134 / 25%) 0px 0px 3px 1px;
    background: white;
`;

export const OptionLabel = styled.option`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 5px 0;

    :focus {
        background: blue;
        color: white;
    }
`;
