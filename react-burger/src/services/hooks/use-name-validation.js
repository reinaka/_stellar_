import { useState, useCallback } from "react";

export function useNameValidation(input) {
    const [name, setName] = useState({
        value: input || '',
        error: false,
        errorText: '',
    })

    const fillName = useCallback(
        (input) => {
        setName({
            ...name,
            value: input,
            error: false,
            errorText: '',
        })
    }, [name]);

    const validateName = useCallback(
        (value) => {
        if(value.length) {
            setName({
                ...name,
                error: false,
                errorText: '',
            })
            return true;
        } else {
            setName({
                ...name,
                error: true,
                errorText: "Введите имя"
            })
            return false;
        }
    },[name]);

    return {name, fillName, validateName};
}