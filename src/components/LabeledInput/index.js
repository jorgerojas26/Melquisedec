import { useState } from 'react';
import { StyledMainWrapper, StyledInput, StyledLabel } from './styles';

const LabeledInput = ({ children, placeholder, file, value, capitalize, errorborder, ...rest }) => {
    const [labelActive, setLabelActive] = useState(false);

    const handleBlur = ({ target: { value } }) => {
        setLabelActive(!!value);
    };

    return (
        <StyledMainWrapper file={file} errorborder={errorborder} onBlur={handleBlur}>
            <StyledInput capitalize={capitalize} value={value} {...rest} />
            <StyledLabel className={labelActive || (value && value.toString().length) ? 'active' : ''}>{placeholder}</StyledLabel>
            {children}
        </StyledMainWrapper>
    );
};

export default LabeledInput;
