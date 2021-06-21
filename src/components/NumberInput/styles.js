import styled from 'styled-components';
import Button from 'components/Button';

import { colors } from 'styles/theme';

export const Wrapper = styled.div`
    flex-direction: row;
    justify-content: center;
`;
export const MinusButton = styled(Button)`
    max-width: 50px;
    min-width: 0;
    background: red;
`;
export const PlusButton = styled(Button)`
    max-width: 50px;
    min-width: 0;
    background: ${colors.primary};
`;
export const Input = styled.input`
    max-width: 50px;
    min-width: 0;
`;
