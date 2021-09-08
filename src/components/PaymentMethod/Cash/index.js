import { Wrapper } from './styles';
import * as L from '../styles';
import NumericInput from 'react-number-format';
import LabeledInput from 'components/LabeledInput';
import { InputContainer } from 'components/CommonLayout/form.layout';

const Cash = ({ onChange }) => {
    return (
        <Wrapper>
            <L.NameContainer>Cash</L.NameContainer>
            <L.InputContainer>
                <LabeledInput placeholder='Monto' thousandSeparator='.' decimalSeparator=',' as={NumericInput} />
            </L.InputContainer>
            <L.InputContainer>
                <select>
                    <option>Bs</option>
                    <option>$</option>
                </select>
            </L.InputContainer>
        </Wrapper>
    );
};

export default Cash;
