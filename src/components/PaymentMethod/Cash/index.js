import * as L from '../styles';
import NumericInput from 'react-number-format';
import LabeledInput from 'components/LabeledInput';
import { useCurrencyRates } from 'hooks/useCurrencyRates';

const Cash = ({ inputValue, onChange, onDelete, disabled }) => {
    const { currencyRates } = useCurrencyRates();

    return (
        <L.Wrapper ischange={inputValue.isChange}>
            <L.NameContainer onClick={onDelete}>Cash</L.NameContainer>
            <L.InputContainer>
                <LabeledInput
                    value={inputValue.amount || ''}
                    onValueChange={({ floatValue }) => onChange && onChange(floatValue, 'amount')}
                    placeholder={
                        inputValue.currency && inputValue.currency === 'USD'
                            ? `Monto - ${
                                  currencyRates && currencyRates['USD'] && currencyRates['USD'].value
                                      ? ((inputValue.amount || 0) * currencyRates['USD'].value).toLocaleString()
                                      : ''
                              } Bs`
                            : 'Monto'
                    }
                    thousandSeparator='.'
                    decimalSeparator=','
                    disabled={disabled}
                    autoFocus
                    as={NumericInput}
                />
            </L.InputContainer>
            <L.SelectContainer>
                <select value={inputValue.currency} onChange={(event) => onChange(event.target.value, 'currency')} disabled={disabled}>
                    <option value='VES'>Bs</option>
                    <option value='USD'>USD</option>
                </select>
            </L.SelectContainer>
        </L.Wrapper>
    );
};

export default Cash;
