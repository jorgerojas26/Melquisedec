import * as L from '../styles';
import NumericInput from 'react-number-format';
import LabeledInput from 'components/LabeledInput';

const POS = ({ inputValue, onChange, onDelete }) => {
    return (
        <L.Wrapper ischange={inputValue.isChange}>
            <L.NameContainer onClick={onDelete}>POS</L.NameContainer>
            <L.InputContainer>
                <LabeledInput
                    value={inputValue.amount || ''}
                    onValueChange={({ floatValue }) => onChange(floatValue, 'amount')}
                    placeholder='Monto'
                    thousandSeparator='.'
                    decimalSeparator=','
                    as={NumericInput}
                />
            </L.InputContainer>
            <L.CurrencyContainer>Bs</L.CurrencyContainer>
        </L.Wrapper>
    );
};

export default POS;
