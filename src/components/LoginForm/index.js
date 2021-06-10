import { MainWrapper, MainContainer, ContentContainer, Main, Header, InputContainer, SubmitButtonContainer, LogoContainer } from './styles';

import Banner from 'components/shared/Banner';

import { colors } from 'styles/theme';

import LabeledInput from 'components/LabeledInput';
import SubmitButton from 'components/Button';

const LoginForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <MainWrapper>
            <MainContainer>
                <ContentContainer>
                    <Header>
                        <LogoContainer>
                            <Banner fill={colors.primary} />
                        </LogoContainer>
                    </Header>
                    <Main>
                        <form onSubmit={handleSubmit}>
                            <InputContainer>
                                <LabeledInput placeholder='Usuario' autoFocus />
                            </InputContainer>
                            <InputContainer>
                                <LabeledInput type='password' placeholder='Contraseña' />
                            </InputContainer>
                            <SubmitButtonContainer>
                                <SubmitButton>Enviar</SubmitButton>
                            </SubmitButtonContainer>
                        </form>
                    </Main>
                </ContentContainer>
            </MainContainer>
        </MainWrapper>
    );
};

export default LoginForm;
