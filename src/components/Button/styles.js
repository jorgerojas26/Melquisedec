import styled from 'styled-components';

import { colors } from 'styles/theme';

export const StyledButton = styled.button`
    width: 100%;
    height: 100%;
    padding: 20px;
    margin: 0;
    background: ${({ background }) => (background ? background : colors.primary)};
    font-weight: 800;
    font-size: 14px;
    color: white;

    min-width: 0px;
    min-height: 0px;

    border-radius: 4px;

    overflow-wrap: break-word;
    overflow: hidden;
    overflow-text: ellipsis;
    white-space: nowrap;
`;
