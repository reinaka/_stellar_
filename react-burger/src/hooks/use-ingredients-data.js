export const useIngredientsData = (url) => {
    return fetch(url)
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
        })
};
