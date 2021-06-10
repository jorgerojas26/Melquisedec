import { StyledButton } from './styles';

const Button = ({ children, disabled, ...rest }) => {
    return (
        <StyledButton type='button' disabled={disabled} {...rest}>
            {children}
        </StyledButton>
    );
};

export default Button;
