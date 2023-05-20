import { useState, useCallback } from "react";

function getOrderdata(url, dataToPost) {
    return fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToPost)
})
.then(res => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка ${res.status}`);
    }
    })
}

// useOrderData hook
export const useOrderData = (url, data) => {
    const dataToPost = {"ingredients": data};
    const [orderNum, setOrderNum] = useState({
        isLoading: true,
        hasError: false,
        num: null,
    });

    const getOrderNum = useCallback(
        () => {
        const result = getOrderdata(url, dataToPost);
        result.then(data => setOrderNum({isLoading: false, hasError: false, num: data.order.number}))
        .catch(e => setOrderNum({...orderNum, isLoading: false, hasError: true}))
    }, [dataToPost, url, orderNum]);

    const clearOrderNum = useCallback(
        () => setOrderNum({isLoading: true, hasError: false, num: null})
    , []);
    
    return [orderNum, getOrderNum, clearOrderNum];
}