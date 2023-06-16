import { getServerResponse, catchServerResponseError } from '../functions/getServerResponse';
import { saveTokens, clearTokens } from '../functions/handleTokens';
import { GET_TOKEN_ENDPOINT, GET_USER_INFO_ENDPOINT, LOGOUT_ENDPOINT, RESET_PASSWORD_ENDPOINT } from '../../constants/constants';

export const AUTH_REQUEST="AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILED = "AUTH_FAILED";
export const UPDATE_TOKEN = "UPDATE_TOKEN";
export const VERIFY_USER = "VERIFY_USER";
export const LOGOUT = 'LOGOUT';
export const AUTH_CHECKED = "AUTH_CHECKED";

export function getAuth(endpoint, dataToPost) {   
    return async function(dispatch) {
        dispatch({
            type: AUTH_REQUEST
        });
        getServerResponse(endpoint, {
            method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToPost)
        })
        .then(res => {
            if(res.success) {
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: res
                });
                saveTokens(res);
            }
        })
        .catch(error => catchServerResponseError(error, dispatch))
    }
}

export function refreshToken() {
    return async function(dispatch) {
        getServerResponse(GET_TOKEN_ENDPOINT, {
            method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: localStorage.getItem('refreshToken')
                    }),
        })
        .then(res => {
            if(res.success) {
                dispatch({
                    type: UPDATE_TOKEN,
                    payload: res
                });
                saveTokens(res);
            }
        })
        .catch(error => catchServerResponseError(error, dispatch))
    }  
}

export function verifyToken() {
    return async function(dispatch) {
        return getServerResponse(GET_USER_INFO_ENDPOINT, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken'),
            },
        })
        .then(res => {
            if(res.success) {
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: res
                });
            } 
            return true;
        })
        .catch(error => {
            error.then(error => {
                if(error.message === "jwt expired") {
                    dispatch(refreshToken());
                }
            })
            catchServerResponseError(error, dispatch);
            return false;
        });
    }
}

export function getUserInfo() {
    return async function(dispatch) {
        dispatch({
            type: AUTH_REQUEST
        });
        getServerResponse(GET_USER_INFO_ENDPOINT, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken'),
            },
        })
        .then(res => {
            if(res.success) {
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: res
                });
            }
        })
        .catch(error => catchServerResponseError(error, dispatch))
}}

export function changeUserInfo(dataToPost) {
    return async function(dispatch) {
        getServerResponse(GET_USER_INFO_ENDPOINT, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(dataToPost)
        })
        .then(res => {
            if(res.success) {
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: res
                });
            }
        })
        .catch(error => catchServerResponseError(error, dispatch))
    }
}

export function logout() {
    return async function(dispatch) {
        getServerResponse(LOGOUT_ENDPOINT, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        })
        .then(res => {
            if(res.success) {
                dispatch({
                    type: LOGOUT
                });
                clearTokens();
            }
        })
        .catch(error => catchServerResponseError(error, dispatch))
    }
}

export function resetPassword(navigate, dataToPost) {
    return async function(dispatch) {
        getServerResponse(RESET_PASSWORD_ENDPOINT, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                password: dataToPost.password,
                token: dataToPost.token
            })
        })
        .then(res => {
            if(res.success) {
                navigate("/profile", {replace: true});
            }
        })
        .catch(error => catchServerResponseError(error, dispatch))
    }
}
