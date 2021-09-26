import ReactDom from 'react-dom';

import { StyledModal } from './styles';

const Modal = ({ children, backdrop, show = false, handleClose }) => {
    return (
        show && (
            <>
                <StyledModal onClick={handleClose} backdrop={backdrop}></StyledModal>
                {children}
            </>
        )
    );
};

const PortalModal = ({ children, backdrop, show = false, handleClose }) => {
    return ReactDom.createPortal(
        <Modal backdrop={backdrop} show={show} handleClose={handleClose}>
            {children}
        </Modal>,
        document.getElementById('modal-root')
    );
};

export default PortalModal;
