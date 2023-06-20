import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components' ;
import { RegistrationForm } from '../../components/ui-elements/form-registration/form-registration';
import { RegisterFormText } from '../../components/ui-elements/register-form-text/register-form-text';
import { RegistrationWrapper } from '../../components/ui-elements/form-registration-wrapper/form-registration-wrapper';
import { useCallback, useState, useEffect } from 'react';
import { getAuth } from '../../services/actions/auth-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEmailValidation } from '../../services/hooks/use-email-validation';
import { usePasswordValidation } from '../../services/hooks/use-password-validation';
import { useNameValidation } from '../../services/hooks/use-name-validation';
import { Navigate, useLocation } from 'react-router-dom';
import { selectLoginSuccess } from '../../services/functions/selectorFunctions';
import { useModal } from '../../services/hooks/use-modal';
import ErrorModal from '../../components/modal/error-modal/error-modal';
import { selectAuthError } from '../../services/functions/selectorFunctions';
import { BASE_URL, REGISTRATION_ENDPOINT } from '../../constants/constants';

export function RegistrationPage () {
    const dispatch = useDispatch();
    const loggedIn = useSelector(selectLoginSuccess);
    const location = useLocation();
    
    const {email, validateEmail, fillEmail} = useEmailValidation();
    const {password, fillPassword, validatePassword} = usePasswordValidation();
    const {name, fillName, validateName} = useNameValidation();

    const dataToPost = {
        "email": email.value,
        "password": password.value,
        "name": name.value,
    }

    const handleRegistration = useCallback(
        (data) => {
        validateEmail(email.value);
        validatePassword(password.value);
        validateName(name.value);
        if(validateName(name.value) && validateEmail(email.value) && validatePassword(password.value)) {
            dispatch(getAuth(REGISTRATION_ENDPOINT, data));
        }
    },[dispatch, email.value, password.value, name.value, validateEmail, validateName, validatePassword]);

    const authError = useSelector(selectAuthError);
    const [errorText, setErrorText] = useState();
    const [isModalVisible, openModal, closeModal] = useModal();

    useEffect(() => {
        if(authError) {
            if(authError === "User already exists") {
                setErrorText("Такой пользователь уже зарегистрирован");
                openModal();
            }
        }
    }, [authError, openModal])

    return loggedIn
    ? <Navigate to={location?.state?.location?.pathname || "/"} replace="true" state={{location}}/>
    : (
        <RegistrationWrapper>
            <RegistrationForm  
                title="Регистрация" 
                onSubmit={(e) => {e.preventDefault(); handleRegistration(dataToPost)}}
                action={`${BASE_URL}${REGISTRATION_ENDPOINT}`}
                method="POST"
        >
            <Input 
                        extraClass="mb-6" 
                        value={name.value} 
                        placeholder="Имя" 
                        name={'name'} 
                        onChange={(e) => fillName(e.target.value)}
                        error={name.error}
                        errorText={name.errorText}
                />
                <EmailInput 
                        extraClass="mb-6" 
                        value={email.value} 
                        name={'email'} 
                        onChange={(e) => fillEmail(e.target.value)}
                        errorText={email.errorText}
                        error={email.error}
                />
                <PasswordInput 
                        value={password.value} 
                        name="password" 
                        onChange={(e) => fillPassword(e.target.value)}
                        errorText={password.errorText}
                        error={password.error}
                />
                <Button 
                        extraClass="mb-20 mt-6" 
                        htmlType="submit" 
                >Зарегистрироваться</Button>
            </RegistrationForm>
            <RegisterFormText linkText="Войти" linkAddress="/login">Уже зарегистрированы?</RegisterFormText>
            {authError && isModalVisible && <ErrorModal message={errorText} closeModal={closeModal}/>}
        </RegistrationWrapper>
    )
}
