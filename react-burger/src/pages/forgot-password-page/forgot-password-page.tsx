import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components' ;
import { RegistrationWrapper } from '../../components/ui-elements/form-registration-wrapper/form-registration-wrapper';
import { useNavigate, useLocation } from 'react-router-dom';
import { FORGOT_PASSWORD_ENDPOINT, BASE_URL } from '../../constants/constants';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../services/actions/auth-actions';
import RegistrationForm from '../../components/ui-elements/form-registration/form-registration';
import RegisterFormText from '../../components/ui-elements/register-form-text/register-form-text';
import { useFormAndValidation } from '../../services/hooks/use-form-validation';

type FormStateType = {
    name : string,
    email : string,
    password : string,
};

export function ForgotPasswordPage () {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch() as any;

    const {values, handleChange} = useFormAndValidation<FormStateType>({
        name : "",
        email : "",
        password : "",
    });

    const handleResetPassword = () => {
        const dataToPost = values.email;
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
                value={values?.email || ""} 
                name={'email'} 
                onChange={e => handleChange(e)}/>
            <Button extraClass="mb-20 mt-6" htmlType="submit">Восстановить</Button>
            </RegistrationForm>
            <RegisterFormText linkText="Войти" linkAddress="/login">Вспомнили пароль?</RegisterFormText>
        </RegistrationWrapper>
        </>
    )
}