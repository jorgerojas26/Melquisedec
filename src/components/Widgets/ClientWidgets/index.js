import {} from './styles';
import WidgetBox from 'components/WidgetBox';

const ClientWidgets = ({ show, onClose }) => {
    return (
        <WidgetBox onClose={onClose} show={show}>
            Hello from ClientWidgets
        </WidgetBox>
    );
};

export default ClientWidgets;
