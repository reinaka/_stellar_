import { useState, useCallback } from "react";

export function usePasswordValidation(input) {
    const [password, setPassword] = useState({
        value: input || '',
        error: false,
        errorText: '',
    })

    const fillPassword = useCallback(
        (input) => {
        setPassword({
            ...password,
            value: input,
            error: false,
            errorText: '',
        })
    }, [password]);

    const validatePassword = useCallback(
        (value) => {
        if(!value.length) {
            setPassword({
                ...password,
                error: true,
                errorText: 'Введите пароль',
            })
            return false;
        } else {
            if(value.length < 6) {
                setPassword({
                    ...password,
                    error: true,
                    errorText: 'Пароль должен содержать более 5 символов',
    
                })
                return false;
            } else {
                setPassword({
                    ...password,
                    error: false,
                    errorText: '',
                })
                return true;
            }
        }
    },[password]);

    return {password, fillPassword, validatePassword};
}