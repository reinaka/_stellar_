import { getServerResponse } from '../functions/getServerResponse';
import { saveTokens, clearTokens } from '../functions/handleTokens';
import { 
        GET_TOKEN_ENDPOINT, 
        GET_USER_INFO_ENDPOINT, 
        LOGOUT_ENDPOINT,
        RESET_PASSWORD_ENDPOINT,
    } from '../../constants/constants';

export const AUTH_REQUEST="AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILED = "AUTH_FAILED";
export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const VERIFY_USER = "VERIFY_USER";
export const LOGOUT = 'LOGOUT';

export function getAuth(endpoint, dataToPost) {
    return async function(dispatch) {   
        try{
            dispatch({
                type: AUTH_REQUEST
            });
            fetch(endpoint, {
                method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataToPost)
            })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    dispatch({
                        type: AUTH_SUCCESS,
                        payload: res,
                    });
                    saveTokens(res);
                } else {
                    dispatch({
                        type: AUTH_FAILED,
                        payload: res.message
                    })
                }
            })
        } catch(error) {
            return Promise.reject(`Ошибка: ${error}`);
        }
    }
}

export function refreshToken() {
    return async function(dispatch) {
        try {
            fetch(GET_TOKEN_ENDPOINT, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: localStorage.getItem('refreshToken')
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    dispatch({
                        type: UPDATE_TOKEN,
                        payload: res,
                    });
                    saveTokens(res);
                } else {
                    dispatch({
                        type: AUTH_FAILED,
                        payload: res.message
                    })
                }
            })
        } catch(error) {
            return Promise.reject(`Ошибка: ${error}`);
        }
    }   
}

export function verifyToken() {
    return async function(dispatch) {
        try {
            fetch(GET_USER_INFO_ENDPOINT, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('accessToken'),
                },
            })
            .then(res => {
                if(res.ok) {
                    res.json()
                    .then(res => {
                        dispatch({
                            type: VERIFY_USER,
                            payload: res,
                        });
                    });
                } else {
                    res.json()
                    .then(res => {
                        if(res.message === "jwt expired") {
                            refreshToken(dispatch);
                        } else {
                            throw new Error(res.message);
                        }
                    })
                }
            })
        } catch (error) {
            return Promise.reject(`Ошибка: ${error}`);
        }
    }
}

export function getUserInfo() {
    return async function(dispatch) {
        try {
            dispatch({
                type: AUTH_REQUEST
            });
            fetch(GET_USER_INFO_ENDPOINT, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('accessToken'),
                },
            })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    dispatch({
                        type: AUTH_SUCCESS,
                        payload: res,
                    });
                } else {
                    
                }
            })}
            catch (error) {
                return Promise.reject(`Ошибка: ${error}`);
        }
    }
}

export function changeUserInfo(dataToPost) {
    return async function(dispatch) {
        try {
            fetch(GET_USER_INFO_ENDPOINT, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(dataToPost)
            })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    dispatch({
                        type: AUTH_SUCCESS,
                        payload: res,
                    });
                } else {
                    dispatch({
                        type: AUTH_FAILED,
                        payload: res.message
                    })
                }
            })
        } catch (error) {
            return Promise.reject(`Ошибка: ${error}`);
        }
    }
}

export function logout() {
    return async function(dispatch) {
        try {
            const response = await getServerResponse(LOGOUT_ENDPOINT, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: localStorage.getItem('refreshToken')
                })
            });
            if(response.success) {
                dispatch({
                    type: LOGOUT
                });
                clearTokens();
            }
        } catch (error) {
            return Promise.reject(`Ошибка: ${error}`);
        }
    }
}

export function resetPassword(navigate, dataToPost) {
    return async function(dispatch) {
        try{
            fetch(RESET_PASSWORD_ENDPOINT, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: dataToPost.password,
                    token: dataToPost.token
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res.success) {
                    navigate("/profile", {replace: true});
                } else {
                    dispatch({
                        type: AUTH_FAILED,
                        payload: res.message
                    })
                }
            })
        } catch(error) {
            return Promise.reject(`Ошибка: ${error}`);
        }
    }
}

