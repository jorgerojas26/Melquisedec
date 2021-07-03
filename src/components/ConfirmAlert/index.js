import { Container, Header, Title, Body, Description, Footer, ButtonContainer, CloseButtonContainer } from './styles';

import Button from 'components/Button';

import { colors } from 'styles/theme';

import { X } from 'phosphor-react';

const ConfirmAlert = ({ showNotification, handleClose, callback }) => {
    const handleClick = async () => {
        const response = await callback();
        if (response.error) {
            showNotification('error', response.error.message, 3000);
        } else {
            showNotification('success', 'Se ha eliminado el recurso con éxito');
        }
    };
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
                <Description>¿Está seguro que desea realizar esta acción?</Description>
            </Body>
            <Footer>
                <ButtonContainer color={colors.primary}>
                    <Button onClick={handleClick}>Aceptar</Button>
                </ButtonContainer>
                <ButtonContainer color='red'>
                    <Button onClick={handleClose}>Cancelar</Button>
                </ButtonContainer>
            </Footer>
        </Container>
    );
};

export default ConfirmAlert;
