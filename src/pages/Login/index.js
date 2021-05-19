import { FormContainer, MainWrapper } from './layout.styles';

import LoginForm from 'components/LoginForm';

const LoginPage = () => {
    return (
        <MainWrapper>
            <FormContainer>
                <LoginForm />
            </FormContainer>
        </MainWrapper>
    );
};

export default LoginPage;
