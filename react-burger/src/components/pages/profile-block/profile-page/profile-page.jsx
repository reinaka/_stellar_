import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-page.module.css';
import { selectUserName, selectUserEmail } from '../../../../services/functions/selectorFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, changeUserInfo } from '../../../../services/actions/auth-actions';
import { useEffect, useCallback, useMemo, useState } from 'react';
import { useNameValidation } from '../../../../services/hooks/use-name-validation';
import { useEmailValidation } from '../../../../services/hooks/use-email-validation';
import { usePasswordValidation } from '../../../../services/hooks/use-password-validation';
import { useLocation } from 'react-router-dom';

export function ProfilePage() {
    const dispatch = useDispatch();
    const [buttonsVisible, setButtonsVisible] = useState(false);
    const location = useLocation();
    console.log(location);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);


    const userName = useSelector(selectUserName);
    const userEmail = useSelector(selectUserEmail);
    const {name, fillName, validateName} = useNameValidation(userName);
    const {email, fillEmail, validateEmail} = useEmailValidation(userEmail);
    const {password, fillPassword, validatePassword} = usePasswordValidation('');

    useEffect(() => {
        fillName(userName);
        fillEmail(userEmail);
    }, [userEmail, userName])

    const fillDefaultValues = useCallback(() => {
        fillEmail(userEmail);
        fillName(userName);
        fillPassword('');
    }, [fillEmail, fillName, fillPassword, userEmail, userName]);

    const dataToPost = useMemo(() => (
        password.value !== ''
        ? {
            name: name.value,
            email: email.value,
            password: password.value
        }
        : {
            name: name.value,
            email: email.value,
        }),[email.value, name.value, password.value]);

    const handleReset = useCallback(() => {
        if(password.value !== '') {
            validatePassword(password.value);
            validateEmail(email.value);
            validateName(name.value);
            if(validateEmail && validateName && validatePassword) {
                dispatch(changeUserInfo(dataToPost));
            }
        } else {
            validateEmail(email.value);
            validateName(name.value);
            if(validateEmail && validateName) {
                dispatch(changeUserInfo(dataToPost));
            }
        }
        
    }, [dataToPost, dispatch, email.value, name.value, validateEmail, validateName, password.value, validatePassword]);

    useEffect(() => {
        if(userEmail !== email.value || userName !== name.value || password.value !== '') {
            setButtonsVisible(true);
        } else {
            setButtonsVisible(false);
        }
    }, [email.value, name.value, password.value, userName, userEmail]);

    return (
        <form>
            <Input 
                extraClass="mb-6" 
                placeholder="Имя" 
                value={name.value} 
                icon="EditIcon"
                error={name.error}
                errorText={name.errorText}
                onChange={e => fillName(e.target.value)}
            />
            <EmailInput 
                extraClass="mb-6" 
                placeholder="Логин" 
                value={email.value} 
                icon="EditIcon"
                error={email.error}
                errorText={email.errorText}
                onChange={e => fillEmail(e.target.value)}
            />
            <PasswordInput 
                placeholder="Пароль" 
                value={password.value} 
                icon="EditIcon"
                error={password.error}
                errorText={password.errorText}
                onChange={e => fillPassword(e.target.value)}
            />
            {buttonsVisible && (
                <div className={styles.buttonBox}>
                <Button extraClass="mt-6" htmlType='button' onClick={() => handleReset(dataToPost)}>Сохранить</Button>
                <Button extraClass="mt-6" htmlType='button' onClick={() => fillDefaultValues()}>Отменить</Button>
            </div>
            )}
        </form> 
    ) 
}
