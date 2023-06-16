import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components' ;
import { RegistrationForm } from '../../components/ui-elements/form-registration/form-registration';
import { RegisterFormText } from '../../components/ui-elements/register-form-text/register-form-text';
import { RegistrationWrapper } from '../../components/ui-elements/form-registration-wrapper/form-registration-wrapper';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { selectLoginSuccess } from '../../services/functions/selectorFunctions';
import { getServerResponse } from '../../services/functions/getServerResponse';
import { FORGOT_PASSWORD_ENDPOINT, BASE_URL } from '../../constants/constants';
import { useEmailValidation } from '../../services/hooks/use-email-validation';

export function ForgotPasswordPage () {
    const loggedIn = useSelector(selectLoginSuccess);
    const navigate = useNavigate();
    const location = useLocation();
    const {email, validateEmail, fillEmail} = useEmailValidation();

    const handleResetPassword = () => {
        validateEmail(email.value);
        try {
            getServerResponse(FORGOT_PASSWORD_ENDPOINT, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value
            })
        })
        .then(res => {
            if(res.success) {
                navigate("/reset-password", {state: { from: location.pathname}});
            } 
        })}
        catch(error) {
            throw new Error(`Ошибка: ${error}`);
        }
    }   

    return loggedIn
    ? <Navigate to="/" replace="true"/>
    : (<>
        <RegistrationWrapper>
            <RegistrationForm 
                action={`${BASE_URL}${FORGOT_PASSWORD_ENDPOINT}`}
                method='POST'
                title="Восстановление пароля" 
                buttonText="Восстановить" 
                onSubmit={(e) => {e.preventDefault();handleResetPassword()}}
            >
                <EmailInput 
                    extraClass="mb-6" 
                    value={email.value} 
                    name={'email'} 
                    error={email.error}
                    errorText={email.errorText}
                    onChange={(e) => fillEmail(e.target.value)}/>
                <Button extraClass="mb-20 mt-6" htmlType="submit">Восстановить</Button>
            </RegistrationForm>
            <RegisterFormText linkText="Войти" linkAddress="/">Вспомнили пароль?</RegisterFormText>
        </RegistrationWrapper>
        </>
    )
}