import styled from 'styled-components';
import { colors, breakpoints } from 'styles/theme';

export const MainWrapper = styled.div`
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: ${colors.black};
`;

export const FormContainer = styled.div`
    width: 80%;
    height: 50%;
    border-radius: 4px;

    @media (min-width: ${breakpoints.mobile}) {
        width: 500px;
        height: 450px;
    }

    @media (min-width: ${breakpoints.laptop}) {
        width: 600px;
        height: 500px;
    }
`;
