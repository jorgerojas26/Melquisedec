import { useState } from 'react';
import { StyledMainWrapper, StyledInput, StyledLabel } from './styles';

const LabeledInput = ({ placeholder, ...rest }) => {
    const [labelActive, setLabelActive] = useState(false);

    const handleBlur = ({ target: { value } }) => {
        setLabelActive(!!value);
    };

    return (
        <StyledMainWrapper onBlur={handleBlur}>
            <StyledInput {...rest} />
            <StyledLabel className={labelActive ? 'active' : ''}>{placeholder}</StyledLabel>
        </StyledMainWrapper>
    );
};

export default LabeledInput;
