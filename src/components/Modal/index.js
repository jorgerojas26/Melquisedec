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

export default Modal;
