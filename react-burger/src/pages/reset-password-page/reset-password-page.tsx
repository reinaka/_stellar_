import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components' ;
import { RegistrationWrapper } from '../../components/ui-elements/form-registration-wrapper/form-registration-wrapper';
import { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { selectLoginSuccess } from '../../services/functions/selectorFunctions';
import { resetPassword } from '../../services/actions/auth-actions';
import ErrorModal from '../../components/modal/error-modal/error-modal';
import { useModal } from '../../services/hooks/use-modal';
import { selectAuthError } from '../../services/functions/selectorFunctions';
import { RESET_PASSWORD_ENDPOINT, BASE_URL } from '../../constants/constants';
import { useLocation } from 'react-router-dom';
import RegistrationForm from '../../components/ui-elements/form-registration/form-registration';
import RegisterFormText from '../../components/ui-elements/register-form-text/register-form-text';
import { useFormAndValidation } from '../../services/hooks/use-form-validation';

type FormStateType = {
    password : string,
};


export function ResetPasswordPage () {
    const loggedIn = useSelector(selectLoginSuccess);
    const navigate = useNavigate();
    const dispatch = useDispatch() as any;
    const location = useLocation();
    const authError = useSelector(selectAuthError);
    const from = location.state?.from || '/';

    const [code, setCode] = useState('');
    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }

    const {values, handleChange} = useFormAndValidation<FormStateType>({password : ""});

    const handleResetPassword = useCallback(() => {
        const dataToPost = {
            password: values.password,
            token: code
        }
        dispatch(resetPassword(navigate, dataToPost));
    }, [dispatch, code, navigate, values.password]);

    const [errorText, setErrorText] = useState<string>();
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
    ? <Navigate to={from} replace={true} />
    : (
        <>
        <RegistrationWrapper>
            <RegistrationForm 
                title="Восстановление пароля" 
                buttonText="Сохранить"
                onSubmit={(e) => {e.preventDefault(); handleResetPassword()}}
                action={`${BASE_URL}${RESET_PASSWORD_ENDPOINT}`}
                method="POST"
            >
                <PasswordInput 
                    extraClass="mb-6" 
                    value={values?.password || ""} 
                    name="password" 
                    placeholder="Введите новый пароль" 
                    onChange={(e) => handleChange(e)}
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