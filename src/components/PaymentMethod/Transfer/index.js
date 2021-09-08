import { Wrapper } from './styles';
import * as L from '../styles';
import NumericInput from 'react-number-format';
import LabeledInput from 'components/LabeledInput';

const Transfer = ({ onChange }) => {
    return (
        <Wrapper>
            <L.NameContainer>Transfer</L.NameContainer>
            <L.InputContainer>
                <LabeledInput placeholder='Monto' thousandSeparator='.' decimalSeparator=',' as={NumericInput} />
            </L.InputContainer>
            <L.InputContainer>
                <LabeledInput placeholder='COD' />
            </L.InputContainer>
            <L.InputContainer>
                <select>
                    <option>Banco de Venezuela</option>
                </select>
            </L.InputContainer>
        </Wrapper>
    );
};

export default Transfer;
