import { Container, CloseButtonWrapper } from './styles';

import Button from 'components/Button';
import { X } from 'phosphor-react';

const WidgetBox = ({ children, show, onClose }) => {
    return (
        <Container show={show}>
            <CloseButtonWrapper>
                <Button onClick={onClose}>
                    <X size='16px' />
                </Button>
            </CloseButtonWrapper>
            {children}
        </Container>
    );
};

export default WidgetBox;
