import ReactDOM from 'react-dom';

import { Container } from './styles';

const Notification = ({ type, children }) => {
    return <Container type={type}>{children}</Container>;
};

const PortalNotification = ({ type, children }) => {
    return ReactDOM.createPortal(<Notification type={type}>{children}</Notification>, document.getElementById('portal'));
};

export default PortalNotification;
