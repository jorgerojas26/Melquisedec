import * as L from '../styles';
import NumericInput from 'react-number-format';
import LabeledInput from 'components/LabeledInput';

const Transfer = ({ inputValue, onChange, onDelete, disabled }) => {
    return (
        <L.Wrapper ischange={inputValue.isChange}>
            <L.NameContainer onClick={onDelete}>Transfer</L.NameContainer>
            <L.InputContainer>
                <LabeledInput
                    value={inputValue.amount || ''}
                    onValueChange={({ floatValue }) => onChange && onChange(floatValue, 'amount')}
                    placeholder='Monto'
                    thousandSeparator='.'
                    decimalSeparator=','
                    disabled={disabled}
                    autoFocus
                    as={NumericInput}
                />
            </L.InputContainer>
            <L.CodeContainer>
                <LabeledInput
                    value={inputValue.transaction_code}
                    onValueChange={({ value }) => onChange && onChange(value, 'transaction_code')}
                    placeholder='COD'
                    disabled={disabled}
                    as={NumericInput}
                />
            </L.CodeContainer>
            <L.SelectContainer>
                <select
                    onChange={(event) => onChange && onChange(event.target.value, 'bankId')}
                    value={inputValue.bankId}
                    disabled={disabled}
                >
                    <option value='1'>Banco de Venezuela</option>
                    <option value='2'>Banco Provincial</option>
                </select>
            </L.SelectContainer>
        </L.Wrapper>
    );
};

export default Transfer;
