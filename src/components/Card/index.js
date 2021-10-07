import { Wrapper, Header, Body, Footer } from './styles';

const Card = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
};

Card.Header = ({ children }) => {
    return <Header>{children}</Header>;
};

Card.Body = ({ children }) => {
    return <Body>{children}</Body>;
};

export default Card;
