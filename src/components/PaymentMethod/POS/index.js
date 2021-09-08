import { Wrapper } from './styles';
import * as L from '../styles';
import NumericInput from 'react-number-format';
import LabeledInput from 'components/LabeledInput';

const POS = ({ onChange }) => {
    return (
        <Wrapper>
            <L.NameContainer>POS</L.NameContainer>
            <L.InputContainer>
                <LabeledInput placeholder='Monto' thousandSeparator='.' decimalSeparator=',' as={NumericInput} />
            </L.InputContainer>
            <L.CurrencyContainer>Bs</L.CurrencyContainer>
        </Wrapper>
    );
};

export default POS;
