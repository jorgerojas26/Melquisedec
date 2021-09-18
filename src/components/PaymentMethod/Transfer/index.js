import * as L from '../styles';
import NumericInput from 'react-number-format';
import LabeledInput from 'components/LabeledInput';

const Transfer = ({ inputValue, onChange, onDelete }) => {
    return (
        <L.Wrapper ischange={inputValue.isChange}>
            <L.NameContainer onClick={onDelete}>Transfer</L.NameContainer>
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
            <L.CodeContainer>
                <LabeledInput
                    value={inputValue.code || ''}
                    onValueChange={({ floatValue }) => onChange(floatValue, 'code')}
                    placeholder='COD'
                    as={NumericInput}
                />
            </L.CodeContainer>
            <L.SelectContainer>
                <select onChange={(event) => onChange(event.target.value, 'bankId')} value={inputValue.bankId}>
                    <option value='1'>Banco de Venezuela</option>
                    <option value='2'>Banco Provincial</option>
                </select>
            </L.SelectContainer>
        </L.Wrapper>
    );
};

export default Transfer;
