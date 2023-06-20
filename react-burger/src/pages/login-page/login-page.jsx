import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components' ;
import { RegistrationForm } from '../../components/ui-elements/form-registration/form-registration';
import { RegisterFormText } from '../../components/ui-elements/register-form-text/register-form-text';
import { RegistrationWrapper } from '../../components/ui-elements/form-registration-wrapper/form-registration-wrapper';
import { getAuth } from '../../services/actions/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEmailValidation } from '../../services/hooks/use-email-validation';
import { usePasswordValidation } from '../../services/hooks/use-password-validation';
import { selectLoginSuccess, selectAuthError } from '../../services/functions/selectorFunctions';
import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ErrorModal from '../../components/modal/error-modal/error-modal';
import { useModal } from '../../services/hooks/use-modal';
import { useLocation } from 'react-router-dom';
import { BASE_URL, AUTH_ENDPOINT } from '../../constants/constants';

export function LoginPage () {
    const dispatch = useDispatch();
    const loggedIn = useSelector(selectLoginSuccess);
    const authError = useSelector(selectAuthError);
    const location = useLocation();
    const [errorText, setErrorText] = useState();
    const [isModalVisible, openModal, closeModal] = useModal();

    useEffect(() => {
        if(authError) {
            if(authError === "email or password are incorrect") {
                setErrorText("Неверный логин или пароль");
                openModal();
            }
    }}, [authError, openModal]);

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
            <RegistrationForm 
                title="Вход" 
                buttonText="Войти" 
                onSubmit={(e) => {e.preventDefault(); handleLogin(dataToPost)}}
                action={`${BASE_URL}${AUTH_ENDPOINT}`}
                methos="POST"
            >
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
                    htmlType="submit" 
                >Войти</Button>
            </RegistrationForm>
            <RegisterFormText linkText="Зарегистрироваться" linkAddress="/register">Вы — новый пользователь?</RegisterFormText>
            <RegisterFormText linkText="Восстановить пароль" linkAddress="/forgot-password">Забыли пароль?</RegisterFormText>
        </RegistrationWrapper>
        {authError && isModalVisible && <ErrorModal message={errorText} closeModal={closeModal}/>}
        </>
    )
}

