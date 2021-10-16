import styled from 'styled-components';
import { colors } from 'styles/theme';

export const Wrapper = styled.div`
    background: white;
    box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px;
    border-radius: 16px;
`;

export const Header = styled.div`
    flex: 0 0 50px;
    flex-direction: row;
    justify-content: space-between;
    place-items: center;
    background: ${colors.superLightGray};

    padding: 0 10px;

    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom: 1px solid ${colors.lightGray};

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0;
    }
`;

export const Body = styled.div`
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`;

export const Footer = styled.div``;
