import styled from 'styled-components';
import { colors } from 'styles/theme';

export const Wrapper = styled.div`
    flex-grow: 1;
    background: white;
    box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px;
    border-radius: 16px;
`;

export const Header = styled.div`
    flex: 0 0 50px;
    justify-content: center;
    background: ${colors.superLightGray};

    padding-left: 20px;

    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom: 1px solid ${colors.lightGray};

    h2 {
        margin: 0;
    }
`;

export const Body = styled.div`
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`;

export const Footer = styled.div``;
