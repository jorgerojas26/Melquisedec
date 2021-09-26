import * as L from './styles';
import NumericInput from 'react-number-format';

const ClientDetails = ({ name, cedula = '', phoneNumber }) => {
    return (
        <L.Wrapper>
            <label>Nombre:</label>
            <span>{name}</span>
            <label>Cédula:</label>
            <span>{Number(cedula).toLocaleString()}</span>
            <label>Teléfono:</label>
            <NumericInput displayType='text' value={phoneNumber} format='( #### ) - ### - ####' />
        </L.Wrapper>
    );
};

export default ClientDetails;
