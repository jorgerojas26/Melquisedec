import styled from 'styled-components';

export const StyledModal = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 100%;

    ${(props) =>
        props.backdrop &&
        `
        background: rgba(0, 0, 0, .6);
    `}

    z-index: ${(props) => (props.zindex ? props.zindex : '3')};
`;
