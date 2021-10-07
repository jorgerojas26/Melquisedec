import ReactDom from 'react-dom';

import { StyledModal } from './styles';

const Modal = ({ children, backdrop, show = false, handleClose, zindex }) => {
    return (
        show && (
            <>
                <StyledModal zindex={zindex} onClick={handleClose} backdrop={backdrop}></StyledModal>
                {children}
            </>
        )
    );
};

const PortalModal = ({ children, backdrop = true, show = false, handleClose, zindex }) => {
    return ReactDom.createPortal(
        <Modal backdrop={backdrop} show={show} handleClose={handleClose} zindex={zindex}>
            {children}
        </Modal>,
        document.getElementById('modal-root')
    );
};

export default PortalModal;
