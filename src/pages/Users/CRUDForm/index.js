import { useEffect } from 'react';
import {
    Form,
    HeaderContainer,
    CloseButtonContainer,
    TitleContainer,
    BodyContainer,
    FooterWrapper,
    FooterContainer,
    ButtonContainer,
    ErrorAlert,
    ErrorContainer,
    InputContainer,
} from 'components/CommonLayout/form.layout';

import Button from 'components/Button';
import LabeledInput from 'components/LabeledInput';
import NumericFormatInput from 'react-number-format';
import { X } from 'phosphor-react';
import { colors } from 'styles/theme';
import { useForm } from 'hooks/useForm';
import { createUser, updateUser } from 'api/users';
import userSchema from 'validations/schemas/user';

const UserForm = ({ user, action, handleClose, onSubmit }) => {
    const { handleChange, handleNumericInput, handleSubmit, formData, setFormData, submitErrors, submitSuccess } = useForm({
        initialState: {
            username: '',
            password: '',
            permissions: '',
        },
        action,
        createResource: createUser,
        editResource: updateUser,
        schema: userSchema,
    });
    console.log(submitErrors);

    useEffect(() => {
        if (action === 'edit' && user) setFormData({ id: user.id, username: user.username, password: null, permissions: user.permissions });
    }, [user, action, setFormData]);

    useEffect(() => {
        if (submitSuccess) {
            if (action === 'create') {
                onSubmit('El usuario se ha registrado con éxito');
            } else if (action === 'edit') {
                onSubmit('El usuario se ha actualizado con éxito');
            }
        }
    }, [submitSuccess, action, onSubmit]);

    const printError = (path) => {
        if (submitErrors[path]) {
            return <ErrorAlert>{submitErrors[path]}</ErrorAlert>;
        }
    };

    const hasError = (path) => {
        return submitErrors[path];
    };
    return (
        <Form onSubmit={handleSubmit}>
            <HeaderContainer>
                <CloseButtonContainer>
                    <Button>
                        <X onClick={handleClose} />
                    </Button>
                </CloseButtonContainer>
                <TitleContainer>
                    {action === 'create' && 'Crear usuario'}
                    {action === 'edit' && 'Editar usuario'}
                </TitleContainer>
            </HeaderContainer>
            <BodyContainer>
                <InputContainer>
                    <LabeledInput
                        onChange={handleChange}
                        value={formData.username}
                        name='username'
                        placeholder='Nombre de usuario'
                        autoFocus
                        errorborder={hasError('username')}
                        required
                    />
                    {printError('username')}
                </InputContainer>
                {action !== 'edit' && (
                    <InputContainer>
                        <LabeledInput
                            onChange={handleChange}
                            value={formData.password}
                            name='password'
                            placeholder='Contraseña'
                            type='password'
                            errorborder={hasError('password')}
                            required
                        />
                        {printError('password')}
                    </InputContainer>
                )}
                <InputContainer>
                    <LabeledInput
                        onValueChange={(value) => handleNumericInput(value.floatValue, 'permissions')}
                        value={formData.permissions}
                        placeholder='Nivel de permiso'
                        isAllowed={(inputObj) => {
                            if (inputObj.value < 3) return inputObj;
                        }}
                        allowDecimalSeparators={false}
                        format='#'
                        errorborder={hasError('permissions')}
                        as={NumericFormatInput}
                        required
                    />
                    <small>0: Empleado 1: Administrador 2: Master</small>
                    {printError('permissions')}
                </InputContainer>
            </BodyContainer>
            <FooterWrapper>
                <ErrorContainer>{printError('undefined')}</ErrorContainer>
                <FooterContainer>
                    <ButtonContainer color={colors.primary}>
                        <Button type='submit'>Enviar</Button>
                    </ButtonContainer>
                    <ButtonContainer color='red'>
                        <Button>Cancelar</Button>
                    </ButtonContainer>
                </FooterContainer>
            </FooterWrapper>
        </Form>
    );
};

export default UserForm;
