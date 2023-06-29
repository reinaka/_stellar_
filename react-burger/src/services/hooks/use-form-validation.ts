import {useState, useCallback} from 'react';

type TValues = {
    [key: string] : string
};

type TErrors = {
    [key: string] : string | undefined
}


export function useFormAndValidation(initialValues : TValues) {
    const [ values, setValues ] = useState(initialValues);
    const [ errors, setErrors ] = useState<TErrors>({});
    const [ isValid, setIsValid ] = useState(true);

    const handleChange = (e: { target: { validationMessage?: string; closest?: any; name: string; value: string; }; }) => {
        const {name, value} = e.target
        setValues({...values, [name]: value });
        setErrors({...errors, [name]: e.target.validationMessage});
        setIsValid(e.target.closest('form').checkValidity());
    };



    const resetForm = useCallback((initialValues : {[key: string]: string;}, newErrors = {}, newIsValid = false) => {
        setValues(initialValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    }, [setValues, setErrors, setIsValid]);

    return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}