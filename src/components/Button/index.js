import { StyledButton } from './styles';

const Button = ({ children, disabled, loading, ...rest }) => {
    return (
        <StyledButton className={loading ? 'button--loading' : ''} type='button' disabled={disabled} {...rest}>
            <span className='button_text'>{children}</span>
        </StyledButton>
    );
};

export default Button;
