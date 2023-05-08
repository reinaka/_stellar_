import { useState, useEffect } from 'react';

export const useIngredientsData = (url) => {
    const [state, setState] = useState({
        isLoading: true,
        hasError: false,
        data: []
    });

    useEffect(
        () => {
            const getData = () => {
                const address = url;
                fetch(address)
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка ${res.status}`);
                    })
                    .then(apiData => setState({...state, data: apiData.data, isLoading: false, hasError: false}))
                    .catch(e => setState({...state, isLoading: false, hasError: true}))
            };
            getData();
        }, []);

    return state;
}