import styled from 'styled-components';
import { colors } from 'styles/theme';

export const Container = styled.div`
    flex: 1;
`;

export const Header = styled.div`
    flex: 0 1 auto;
    border-bottom: 1px solid ${colors.shadow};
`;

export const Title = styled.span`
    margin-left: 10px;
    font-size: 24px;
    font-weight: 600;
    padding: 5px 0;
`;

export const Body = styled.div`
    flex: 1 1 auto;
    padding: 20px 0;
`;

export const Description = styled.span`
    margin-left: 10px;
    font-size: 19px;
    font-weight: 400;
`;
export const Footer = styled.div`
    flex-direction: row;
    justify-content: flex-end;
    flex: 0 1 auto;
    height: 50px;
    border-top: 1px solid ${colors.shadow};
    padding: 5px 0;
`;

export const ButtonContainer = styled.div`
    background: ${(props) => props.color};
    margin-right: 10px;

    > button {
        color: white;
    }
`;

export const CloseButtonContainer = styled.div`
    align-items: flex-end;
    margin: 0;
    padding: 0;
`;
