import * as L from './styles';
import NumericInput from 'react-number-format';

const ClientDetails = ({ name = '', cedula = '', phoneNumber = '' }) => {
    return (
        <L.Wrapper>
            <label>Nombre:</label>
            <span>{name || 'Anónimo'}</span>
            <label>Cédula:</label>
            <span>{(cedula && Number(cedula).toLocaleString()) || 'Anónimo'}</span>
            <label>Teléfono:</label>
            {(phoneNumber && <NumericInput displayType='text' value={phoneNumber} format='( #### ) - ### - ####' />) || (
                <span>Anónimo</span>
            )}
        </L.Wrapper>
    );
};

export default ClientDetails;
