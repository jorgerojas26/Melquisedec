import { Container, Header, Title, Body, Description, Footer, ButtonContainer, CloseButtonContainer } from './styles';

import Button from 'components/Button';

import { colors } from 'styles/theme';

import { X } from 'phosphor-react';

const ConfirmAlert = ({ size = 'sm', message, additionalActions = [], handleClose, callback }) => {
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
                <Description>{message || '¿Está seguro que desea realizar esta acción?'}</Description>
            </Body>
            <Footer>
                {additionalActions.length > 0 &&
                    additionalActions.map((action, index) => {
                        return (
                            <ButtonContainer key={index} color={action.color}>
                                <Button onClick={action.callback}>{action.name}</Button>
                            </ButtonContainer>
                        );
                    })}
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
