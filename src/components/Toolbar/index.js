import { Container, ButtonContainer } from './styles';

import { colors } from 'styles/theme';

import { UserCirclePlus, UserCircleGear, UserCircleMinus } from 'phosphor-react';

import Button from 'components/Button';

const Toolbar = ({ children, onCreate, onEdit, onDelete, recordSelected }) => {
    return (
        <Container>
            {children}
            {onCreate && (
                <ButtonContainer color={colors.primary}>
                    <Button name='ToolbarCreate' onClick={onCreate}>
                        <UserCirclePlus size='24px' />
                        Nuevo
                    </Button>
                </ButtonContainer>
            )}
            {onEdit && (
                <ButtonContainer color={colors.secondary}>
                    <Button name='ToolbarEdit' onClick={onEdit} disabled={!recordSelected}>
                        <UserCircleGear size='24px' />
                        Editar
                    </Button>
                </ButtonContainer>
            )}
            {onDelete && (
                <ButtonContainer color='red'>
                    <Button name='ToolbarDelete' onClick={onDelete} disabled={!recordSelected}>
                        <UserCircleMinus size='24px' />
                        Eliminar
                    </Button>
                </ButtonContainer>
            )}
        </Container>
    );
};

export default Toolbar;
