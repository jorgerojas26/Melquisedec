import {
    MainWrapper,
    MainContainer,
    ContentContainer,
    Main,
    Header,
    UsernameContainer,
    PasswordContainer,
    SubmitButtonContainer,
    LogoContainer,
} from './styles';

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
                            <UsernameContainer>
                                <LabeledInput placeholder='Usuario' autoFocus />
                            </UsernameContainer>
                            <PasswordContainer>
                                <LabeledInput type='password' placeholder='Contraseña' />
                            </PasswordContainer>
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
