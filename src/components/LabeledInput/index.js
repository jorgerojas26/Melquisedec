import { StyledMainWrapper, StyledInput, StyledLabel } from './styles';

const LabeledInput = ({ children, placeholder, file, value, active, capitalize, errorborder, onChange, disabled, as, ...rest }) => {
    return (
        <StyledMainWrapper file={file} errorborder={errorborder}>
            <StyledInput onChange={onChange} capitalize={capitalize} value={value} disabled={disabled} as={as} {...rest} />
            <StyledLabel disabled={disabled}>{placeholder}</StyledLabel>
            {children}
        </StyledMainWrapper>
    );
};

export default LabeledInput;
