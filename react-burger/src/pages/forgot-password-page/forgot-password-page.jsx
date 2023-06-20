import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components' ;
import { RegistrationForm } from '../../components/ui-elements/form-registration/form-registration';
import { RegisterFormText } from '../../components/ui-elements/register-form-text/register-form-text';
import { RegistrationWrapper } from '../../components/ui-elements/form-registration-wrapper/form-registration-wrapper';
import { useNavigate, useLocation } from 'react-router-dom';
import { FORGOT_PASSWORD_ENDPOINT, BASE_URL } from '../../constants/constants';
import { useEmailValidation } from '../../services/hooks/use-email-validation';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../services/actions/auth-actions';

export function ForgotPasswordPage () {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {email, validateEmail, fillEmail} = useEmailValidation();

    const handleResetPassword = () => {
        const dataToPost = email.value;
        validateEmail(email.value);
        dispatch(forgotPassword(navigate, location, dataToPost))
    }   

    return (<>
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
            <RegisterFormText linkText="Войти" linkAddress="/login">Вспомнили пароль?</RegisterFormText>
        </RegistrationWrapper>
        </>
    )
}