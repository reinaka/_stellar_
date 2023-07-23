import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components' ;
import { RegistrationWrapper } from '../../components/ui-elements/form-registration-wrapper/form-registration-wrapper';
import { getAuth } from '../../services/actions/auth-actions';
import { useAppSelector, useAppDispatch } from '../../services/hooks/reduxTypes';
import { selectLoginSuccess, selectAuthError } from '../../services/functions/selectorFunctions';
import { useCallback, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ErrorModal from '../../components/modal/error-modal/error-modal';
import { useModal } from '../../services/hooks/use-modal';
import { useLocation } from 'react-router-dom';
import { BASE_URL, AUTH_ENDPOINT } from '../../constants/constants';
import RegistrationForm from '../../components/ui-elements/form-registration/form-registration';
import RegisterFormText from '../../components/ui-elements/register-form-text/register-form-text';
import { useFormAndValidation } from '../../services/hooks/use-form-validation';

type FormStateType = {
    email : string,
    password : string,
};

export function LoginPage () {
    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector(selectLoginSuccess);
    const authError = useAppSelector(selectAuthError);
    const location = useLocation();
    const [errorText, setErrorText] = useState("");
    const [isModalVisible, openModal, closeModal] = useModal();
    const {values, handleChange} = useFormAndValidation<FormStateType>({
        email : "",
        password : "",
    });

    useEffect(() => {
        if(authError) {
            if(authError === "email or password are incorrect") {
                setErrorText("Неверный логин или пароль");
                openModal();
            }
    }}, [authError, openModal]);

    const dataToPost = {
        "email": values.email,
        "password": values.password,
    }

    const handleLogin = useCallback(
        (data : {email : string, password : string}) => {
            dispatch(getAuth(AUTH_ENDPOINT, data));
    },[dispatch]);

    return loggedIn
    ? <Navigate to={location?.state?.location?.pathname || "/"} replace state={{location}}/>
    : (
        <>
        <RegistrationWrapper>
            <RegistrationForm 
                title="Вход" 
                buttonText="Войти" 
                onSubmit={(e: { preventDefault: () => void; }) => {e.preventDefault(); handleLogin(dataToPost)}}
                action={`${BASE_URL}${AUTH_ENDPOINT}`}
                method="POST"
            >
                <EmailInput 
                    extraClass="mb-6" 
                    value={values.email || ""} 
                    name={'email'} 
                    onChange={(e) => handleChange(e)}
                />
                <PasswordInput 
                    value={values.password || ""} 
                    name="password" 
                    onChange={(e) => handleChange(e)}
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

