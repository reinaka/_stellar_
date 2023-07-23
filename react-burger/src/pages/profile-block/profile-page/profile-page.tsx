import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-page.module.css';
import { selectUserName, selectUserEmail, selectUserPassword } from '../../../services/functions/selectorFunctions';
import { useAppSelector, useAppDispatch } from '../../../services/hooks/reduxTypes';
import { getUserInfo, changeUserInfo } from '../../../services/actions/auth-actions';
import { useEffect, useCallback, useState } from 'react';
import { GET_USER_INFO_ENDPOINT, BASE_URL } from '../../../constants/constants';
import { useFormAndValidation } from '../../../services/hooks/use-form-validation';

type FormStateType = {
    name : string | undefined,
    email : string | undefined,
    password? : string | undefined,
};

export function ProfilePage() {
    const dispatch = useAppDispatch();
    const [buttonsVisible, setButtonsVisible] = useState(false);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);


    const userName = useAppSelector(selectUserName);
    const userEmail = useAppSelector(selectUserEmail);
    const userPassword = useAppSelector(selectUserPassword);
    const [initialValues, setInitialValues] = useState<FormStateType>({
        name: userName,
        email: userEmail,
    });

    useEffect(() => {
        setInitialValues({
            name: userName,
            email: userEmail,
        })
    }, [userEmail, userName]);

    const {values, handleChange, resetForm} = useFormAndValidation<FormStateType>(initialValues);

    const handleReset = useCallback(() => {
        dispatch(changeUserInfo(values));
    }, [values, dispatch]);

    useEffect(() => {
        if(userEmail !== values.email || userName !== values.name || userPassword !== values.password) {
            setButtonsVisible(true);
        } else {
            setButtonsVisible(false);
        }
    }, [userEmail, userName, values.email, userPassword, values.name, values.password]);

    return (
        <form className={styles.general}
            onSubmit={(e) => {e.preventDefault(); handleReset()}}
            method="PATCH" 
            action={`${BASE_URL}${GET_USER_INFO_ENDPOINT}`}
        >
            <Input 
                extraClass="mb-6" 
                placeholder="Имя" 
                value={values?.name || ""} 
                icon="EditIcon"
                onChange={e => handleChange(e)}
                name="name"
            />
            <EmailInput 
                extraClass="mb-6" 
                placeholder="Логин" 
                value={values?.email || ""} 
                isIcon={true}
                onChange={e => handleChange(e)}
                name="email"
            />
            <PasswordInput 
                placeholder="Пароль" 
                value={values?.password || ""} 
                onChange={e => handleChange(e)}
                name="password"
            />
            {buttonsVisible && (
                <div className={styles.buttonBox}>
                <Button extraClass="mt-6" htmlType='submit'>Сохранить</Button>
                <Button extraClass="mt-6" htmlType='button' onClick={() => resetForm()}>Отменить</Button>
            </div>
            )}
        </form> 
    ) 
}
