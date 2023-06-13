function checkServerResponse(res) {
    if(res.ok) {
        return res.json();
    } else {
        res.json()
        .then(error => {
            Promise.reject(`Ошибка ${res.status}: ${error.message}`);
            }
        )
    }
}

function checkResponseSuccess(res) {
    if(res && res.success) {
        return res;
    } else {
        return Promise.reject(`Неуспешный запрос`);
    }
}

export async function getServerResponse(endpoint, options) {
    return fetch(endpoint, options)
    .then(res => checkServerResponse(res))
    .then(res => checkResponseSuccess(res))
}