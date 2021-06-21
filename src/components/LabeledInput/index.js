import { useState } from 'react';
import { StyledMainWrapper, StyledInput, StyledLabel, StyledErrorBadge } from './styles';
import { WarningCircle } from 'phosphor-react';
const LabeledInput = ({ children, placeholder, file, value, active, capitalize, errorborder, ...rest }) => {
    const [labelActive, setLabelActive] = useState(false);

    const handleBlur = ({ target: { value } }) => {
        setLabelActive(!!value);
    };

    return (
        <StyledMainWrapper file={file} errorborder={errorborder} onBlur={handleBlur}>
            <StyledInput capitalize={capitalize} value={value} {...rest} />
            <StyledLabel className={labelActive || (value && value.toString().length) || active ? 'active' : ''}>{placeholder}</StyledLabel>
            {children}
        </StyledMainWrapper>
    );
};

export default LabeledInput;
