import { Container, Header, Title, Body, Description, Footer, ButtonContainer, CloseButtonContainer } from './styles';

import Button from 'components/Button';

import { colors } from 'styles/theme';

import { X } from 'phosphor-react';

const ConfirmAlert = ({ message, showNotification, handleClose, callback }) => {
    return (
        <Container>
            <Header>
                <CloseButtonContainer>
                    <Button onClick={handleClose}>
                        <X />
                    </Button>
                </CloseButtonContainer>
                <Title>Confirmación</Title>
            </Header>
            <Body>
                <Description>{message ? message : '¿Está seguro que desea realizar esta acción?'}</Description>
            </Body>
            <Footer>
                <ButtonContainer color={colors.primary}>
                    <Button onClick={callback} autoFocus>
                        Aceptar
                    </Button>
                </ButtonContainer>
                <ButtonContainer color='red'>
                    <Button onClick={handleClose}>Cancelar</Button>
                </ButtonContainer>
            </Footer>
        </Container>
    );
};

export default ConfirmAlert;
