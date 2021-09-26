import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: auto auto;

    justify-content: start;

    label,
    span {
        padding: 5px;
    }

    label {
        font-weight: bold;
    }
`;
