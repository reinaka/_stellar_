import { useState, useCallback } from "react";

export function useEmailValidation(input) {
    const [email, setEmail] = useState({
        value: input || '',
        error: false,
        errorText: '',
    });

    const fillEmail = useCallback(
        (input) => {
        setEmail({
            ...email,
            value: input,
            error: false,
            errorText: '',
        })
    },[email]);

    const validateEmail = useCallback(
        (value) => {
        if(value.length) {
            const pattern = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
            if(value.match(pattern)) {
                setEmail({
                    ...email,
                    error: false,
                    errorText: '',
                })
                return true;
            } else {
                setEmail({
                    ...email,
                    error: true,
                    errorText: 'Неверный формат e-mail',
                })
                return false;
            }
        } else {
            setEmail({
                ...email,
                error: true,
                errorText: 'Введите e-mail',
            })
            return false;
        }
    }, [email]);

    return {email, validateEmail, fillEmail};
}