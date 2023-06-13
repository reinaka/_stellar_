import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components' ;
import { RegistrationForm } from '../../ui-elements/form-registration/form-registration';
import { RegisterFormText } from '../../ui-elements/register-form-text/register-form-text';
import { RegistrationWrapper } from '../../ui-elements/form-registration-wrapper/form-registration-wrapper';
import { getAuth } from '../../../services/actions/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEmailValidation } from '../../../services/hooks/use-email-validation';
import { usePasswordValidation } from '../../../services/hooks/use-password-validation';
import { selectLoginSuccess, selectAuthError } from '../../../services/functions/selectorFunctions';
import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AUTH_ENDPOINT } from '../../../constants/constants';
import ErrorModal from '../../modal/error-modal/error-modal';
import { useModal } from '../../../services/hooks/use-modal';
import { ERROR_TEXT } from '../../../constants/constants';
import { useLocation } from 'react-router-dom';

export function LoginPage (props) {
    const dispatch = useDispatch();
    const loggedIn = useSelector(selectLoginSuccess);
    const authError = useSelector(selectAuthError);
    const location = useLocation();
    const [errorText, setErrorText] = useState();
    const [isModalVisible, openModal, closeModal] = useModal();

    useEffect(() => {
        if(authError) {
            if(authError === "email or password are incorrect") {
                setErrorText("Неверный логин или пароль")
            } else {
                setErrorText(ERROR_TEXT)
            }
            openModal();
        }
    }, [authError, openModal])

    const {email, validateEmail, fillEmail} = useEmailValidation();
    const {password, validatePassword, fillPassword} = usePasswordValidation();

    const dataToPost = {
        "email": email.value,
        "password": password.value,
    }

    const handleLogin = useCallback(
        (data) => {
        validateEmail(email.value);
        validatePassword(password.value);
        if(validateEmail(email.value) && validatePassword(password.value)) {
            dispatch(getAuth(AUTH_ENDPOINT, data));
        }
    },[dispatch, email.value, password.value,  validateEmail, validatePassword]);

    return loggedIn
    ? <Navigate to={location?.state?.location?.pathname || "/"} replace state={{location}}/>
    : (
        <>
        <RegistrationWrapper>
            <RegistrationForm title="Вход" buttonText="Войти">
                <EmailInput 
                    extraClass="mb-6" 
                    value={email.value} 
                    name={'email'} 
                    onChange={(e) => fillEmail(e.target.value)}
                    error={email.error}
                    errorText={email.errorText}
                />
                <PasswordInput 
                    value={password.value} 
                    name="password" 
                    onChange={(e) => fillPassword(e.target.value)}
                    error={password.error}
                    errorText={password.errorText}
                />
                <Button 
                    extraClass="mb-20 mt-6" 
                    htmlType="button" 
                    onClick={() => handleLogin(dataToPost)}
                >Войти</Button>
            </RegistrationForm>
            <RegisterFormText linkText="Зарегистрироваться" linkAddress="/register">Вы — новый пользователь?</RegisterFormText>
            <RegisterFormText linkText="Восстановить пароль" linkAddress="/forgot-password">Забыли пароль?</RegisterFormText>
        </RegistrationWrapper>
        {authError && isModalVisible && <ErrorModal message={errorText} closeModal={closeModal}/>}
        </>
    )
}

