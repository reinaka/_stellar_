import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-page.module.css';
import { selectUserName, selectUserEmail } from '../../../services/functions/selectorFunctions';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo, changeUserInfo } from '../../../services/actions/auth-actions';
import { useEffect, useCallback, useState } from 'react';
import { GET_USER_INFO_ENDPOINT, BASE_URL } from '../../../constants/constants';
import { useFormAndValidation } from '../../../services/hooks/use-form-validation';

export function ProfilePage() {
    const dispatch = useDispatch();
    const [buttonsVisible, setButtonsVisible] = useState(false);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);


    const userName = useSelector(selectUserName);
    const userEmail = useSelector(selectUserEmail);
    const [initialValues, setInitialValues] = useState({
        name: userName,
        email: userEmail,
    });

    useEffect(() => {
        setInitialValues({
            name: userName,
            email: userEmail,
        })
    }, [userEmail, userName]);

    const {values, handleChange, errors,resetForm} = useFormAndValidation(initialValues);

    const handleReset = useCallback(() => {
        dispatch(changeUserInfo(values));
    }, [values, dispatch]);

    useEffect(() => {
        if(userEmail !== values.email || userName !== values.name || values.password) {
            setButtonsVisible(true);
        } else {
            setButtonsVisible(false);
        }
    }, [userEmail, userName, values.email, values.name, values.password]);

    return (
        <form 
            onSubmit={(e) => {e.preventDefault(); handleReset(values)}}
            method="PATCH" 
            action={`${BASE_URL}${GET_USER_INFO_ENDPOINT}`}
        >
            <Input 
                extraClass="mb-6" 
                placeholder="Имя" 
                value={values?.name || ""} 
                icon="EditIcon"
                error={Boolean(errors.name)}
                errorText={errors.name}
                onChange={e => handleChange(e)}
                name="name"
            />
            <EmailInput 
                extraClass="mb-6" 
                placeholder="Логин" 
                value={values?.email || ""} 
                icon="EditIcon"
                error={Boolean(errors.email)}
                errorText={errors.email}
                onChange={e => handleChange(e)}
                name="email"
            />
            <PasswordInput 
                placeholder="Пароль" 
                value={values?.password || ""} 
                icon="EditIcon"
                error={Boolean(errors.password)}
                errorText={errors.password}
                onChange={e => handleChange(e)}
                name="password"
            />
            {buttonsVisible && (
                <div className={styles.buttonBox}>
                <Button extraClass="mt-6" htmlType='submit'>Сохранить</Button>
                <Button extraClass="mt-6" htmlType='button' onClick={() => resetForm(initialValues)}>Отменить</Button>
            </div>
            )}
        </form> 
    ) 
}
