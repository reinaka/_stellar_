import {useState, useCallback} from 'react';

export function useFormAndValidation<T>(inputValues: T) {
    const [ values, setValues ] = useState<T>(inputValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setValues({...values, [name]: value });
    };

    const resetForm = useCallback(() => {
        setValues(inputValues);
    }, [setValues, inputValues]);

    return { values, handleChange, resetForm, setValues };
}