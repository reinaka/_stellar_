import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components' ;
import { RegistrationForm } from '../../ui-elements/form-registration/form-registration';
import { RegisterFormText } from '../../ui-elements/register-form-text/register-form-text';
import { RegistrationWrapper } from '../../ui-elements/form-registration-wrapper/form-registration-wrapper';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectLoginSuccess } from '../../../services/functions/selectorFunctions';
import { usePasswordValidation } from '../../../services/hooks/use-password-validation';
import { resetPassword } from '../../../services/actions/auth-actions';
import ErrorModal from '../../modal/error-modal/error-modal';
import { useModal } from '../../../services/hooks/use-modal';
import { selectAuthError } from '../../../services/functions/selectorFunctions';
import { RESET_PASSWORD_ENDPOINT } from '../../../constants/constants';


export function ResetPasswordPage () {
    const loggedIn = useSelector(selectLoginSuccess);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authError = useSelector(selectAuthError);
    const {password, fillPassword, validatePassword} = usePasswordValidation('');

    const [code, setCode] = useState('');
    const handleName = e => {
        setCode(e.target.value)
    }

    const handleResetPassword = useCallback(() => {
        const dataToPost = {
            password: password.value,
            token: code
        }
        validatePassword(password.value);
        dispatch(resetPassword(navigate, dataToPost));
    }, [dispatch, navigate, password.value, validatePassword, code]);

    const [errorText, setErrorText] = useState();
    const [isModalVisible, openModal, closeModal] = useModal();

    useEffect(() => {
        if(authError) {
            if(authError === "Incorrect reset token") {
                setErrorText("Неверный код восстановления");
                openModal();
            }
        }
    }, [authError, openModal])

    return loggedIn
    ? <Navigate to="/" replace="true"/>
    : (
        <>
        <RegistrationWrapper>
            <RegistrationForm 
                title="Восстановление пароля" 
                buttonText="Сохранить"
                onSubmit={(e) => {e.preventDefault(); handleResetPassword()}}
                action={RESET_PASSWORD_ENDPOINT}
                method="POST"
            >
                <PasswordInput 
                    extraClass="mb-6" 
                    value={password.value} 
                    name="password" 
                    placeholder="Введите новый пароль" 
                    onChange={(e) => fillPassword(e.target.value)}
                />
                <Input 
                    extraClass="mb-6" 
                    value={code} 
                    placeholder="Введите код из письма" 
                    name={'name'} 
                    onChange={(e) => handleName(e)}
                />
                <Button extraClass="mb-20 mt-6" htmlType="submit">Сохранить</Button>
            </RegistrationForm>
            <RegisterFormText linkText="Войти" linkAddress="/login">Вспомнили пароль?</RegisterFormText>
        </RegistrationWrapper>
        {authError && isModalVisible && <ErrorModal message={errorText} closeModal={closeModal}/>}
        </>
    )
}