import styled from 'styled-components';

import { colors } from 'styles/theme';

export const Container = styled.div`
    flex-direction: row;
    justify-content: center;

    width: 100%;
    height: 100%;

    background: none;

    box-shadow: ${colors.shadow} 0px 0px 15px, ${colors.shadow} 0px 0px 3px 1px;
`;

export const ButtonContainer = styled.div`
    height: 100%;
    margin: 0px 5px;

    > button {
        color: white;
    }

    :hover {
        opacity: 0.8;
    }

    background: ${(props) => props.color};
`;
