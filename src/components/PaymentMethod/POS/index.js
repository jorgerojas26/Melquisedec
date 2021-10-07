import * as L from '../styles';
import NumericInput from 'react-number-format';
import LabeledInput from 'components/LabeledInput';

const POS = ({ inputValue, onChange, onDelete, disabled }) => {
    return (
        <L.Wrapper ischange={inputValue.isChange}>
            <L.NameContainer onClick={onDelete}>POS</L.NameContainer>
            <L.InputContainer>
                <LabeledInput
                    value={inputValue.amount || ''}
                    onValueChange={({ value }) => onChange && onChange(value, 'amount')}
                    placeholder='Monto'
                    thousandSeparator='.'
                    decimalSeparator=','
                    decimalScale={2}
                    fixedDecimalScale={true}
                    isNumericString={true}
                    disabled={disabled}
                    autoFocus
                    as={NumericInput}
                />
            </L.InputContainer>
            <L.CurrencyContainer>Bs</L.CurrencyContainer>
        </L.Wrapper>
    );
};

export default POS;
