import styled from 'styled-components';

import { colors } from 'styles/theme';

export const MainWrapper = styled.div`
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
`;

export const MainContainer = styled.div`
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 30px;
`;

export const ContentContainer = styled.div`
    width: 100%;
    border: 2px solid white;
    padding: 30px;
`;

export const Header = styled.header`
    max-height: 200px;
    max-width: 100%;
    margin-bottom: 20px;
`;

export const LogoContainer = styled.div`
    max-height: 100%;

    > svg {
        :hover {
            fill: ${colors.secondary};
        }
    }
`;

export const Main = styled.div``;

export const InputContainer = styled.div`
    align-items: center;
    width: 100%;
    margin-bottom: 10px;

    > small {
        margin-top: 5px;
        font-size: 14px;
    }

    label {
        width: 100%;
    }
`;

export const SubmitButtonContainer = styled.div`
    height: 50px;
    background: ${colors.primary};
    > button {
        color: white;
        font-weight: 700;

        :hover {
            background: ${colors.secondary};
        }
    }
`;
