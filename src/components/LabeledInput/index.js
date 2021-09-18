import { StyledMainWrapper, StyledInput, StyledLabel } from './styles';

const LabeledInput = ({
    children,
    placeholder,
    file,
    value,
    active,
    capitalize,
    errorborder,
    onChange,
    disabled,
    as,
    innerRef,
    ...rest
}) => {
    return (
        <StyledMainWrapper ref={innerRef} file={file} errorborder={errorborder}>
            <StyledInput
                onFocus={(event) => event.target.select()}
                onChange={onChange}
                capitalize={capitalize}
                value={value}
                disabled={disabled}
                {...rest}
                as={as}
            />
            <StyledLabel disabled={disabled}>{placeholder}</StyledLabel>
        </StyledMainWrapper>
    );
};

export default LabeledInput;
