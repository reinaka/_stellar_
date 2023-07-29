import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { RegistrationWrapper } from '../../components/ui-elements/form-registration-wrapper/form-registration-wrapper';
import { useCallback, useState, useEffect } from 'react';
import { getAuth } from '../../services/actions/auth-actions';
import { useAppSelector, useAppDispatch } from '../../services/hooks/reduxTypes';
import { Navigate, useLocation } from 'react-router-dom';
import { selectLoginSuccess } from '../../services/functions/selectorFunctions';
import { useModal } from '../../services/hooks/use-modal';
import ErrorModal from '../../components/modal/error-modal/error-modal';
import { selectAuthError } from '../../services/functions/selectorFunctions';
import { BASE_URL, REGISTRATION_ENDPOINT } from '../../constants/constants';
import RegistrationForm from '../../components/ui-elements/form-registration/form-registration';
import RegisterFormText from '../../components/ui-elements/register-form-text/register-form-text';
import { useFormAndValidation } from '../../services/hooks/use-form-validation';

type FormStateType = {
    name : string,
    email : string,
    password : string,
};

export function RegistrationPage () {
    const dispatch = useAppDispatch();
    const loggedIn = useAppSelector(selectLoginSuccess);
    const location = useLocation();
    
    const {values, handleChange} = useFormAndValidation<FormStateType>({
        name : "",
        email : "",
        password : "",
    });

    const dataToPost = {
        "email": values.email,
        "password": values.password,
        "name":values.name,
    }

    const handleRegistration = useCallback(
        (data: {}) => {
            dispatch(getAuth(REGISTRATION_ENDPOINT, data));
    },[dispatch]);

    const authError = useAppSelector(selectAuthError);
    const [errorText, setErrorText] = useState<string>();
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
    ? <Navigate to={location?.state?.location?.pathname || "/"} replace={true} state={{location}}/>
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
                value={values?.name || ""} 
                placeholder="Имя" 
                name={'name'} 
                onChange={(e) => handleChange(e)}
                icon="EditIcon"
            />
            <EmailInput 
                extraClass="mb-6" 
                value={values?.email || ""} 
                name={'email'} 
                onChange={(e) => handleChange(e)}
            />
            <PasswordInput 
                value={values?.password || ""} 
                name="password" 
                onChange={(e) => handleChange(e)}
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
