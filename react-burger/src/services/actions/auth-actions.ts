import { getServerResponse, catchServerResponseError } from '../functions/getServerResponse';
import { saveTokens, clearTokens } from '../functions/handleTokens';
import { 
        GET_TOKEN_ENDPOINT, 
        GET_USER_INFO_ENDPOINT, 
        LOGOUT_ENDPOINT, 
        RESET_PASSWORD_ENDPOINT, 
        FORGOT_PASSWORD_ENDPOINT 
    } from '../../constants/constants';
import { AppDispatch } from '../types/thunkTypes';
import { NavigateFunction, Location } from 'react-router-dom';

export const AUTH_REQUEST : 'AUTH_REQUEST' = 'AUTH_REQUEST';
export const AUTH_SUCCESS : 'AUTH_SUCCESS' = 'AUTH_SUCCESS';
export const AUTH_FAILED : 'AUTH_FAILED' = 'AUTH_FAILED';
export const UPDATE_TOKEN : 'UPDATE_TOKEN' = 'UPDATE_TOKEN';
export const VERIFY_USER : 'VERIFY_USER' = 'VERIFY_USER';
export const LOGOUT : 'LOGOUT' = 'LOGOUT';
export const AUTH_CHECKED : 'AUTH_CHECKED' = 'AUTH_CHECKED';

export interface IAuthRequestAction {
    readonly type : typeof AUTH_REQUEST
}

export interface IAuthSuccessAction {
    readonly type : typeof AUTH_SUCCESS,
    readonly payload : {
        success : boolean,
        user : {},
    },
    readonly password? : string
}

export interface IUpdateTokenAction {
    readonly type : typeof UPDATE_TOKEN,
    readonly payload : {
        accessToken : string,
        refreshToken : string
    }
}

export interface ILogout {
    readonly type : typeof LOGOUT
}

export interface IAuthFailed {
    readonly type : typeof AUTH_FAILED,
    payload : string
}

export interface IAuthChecked {
    readonly type : typeof AUTH_CHECKED
}

export type TAuthActions = IAuthRequestAction | IAuthSuccessAction | IUpdateTokenAction | ILogout | IAuthFailed | IAuthChecked;

export function getAuth(endpoint : string, dataToPost : {}) {   
    return async function(dispatch : AppDispatch) {
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
        .then((res) => {
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: res
                });
                saveTokens(res);
        })
        .catch(error => catchServerResponseError(error, dispatch))
    }
}

export function refreshToken() {
    return async function(dispatch : AppDispatch) {
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
                dispatch({
                    type: UPDATE_TOKEN,
                    payload: res
                });
                saveTokens(res);
        })
        .catch(error => catchServerResponseError(error, dispatch))
    }  
}

export function verifyToken() {
    return async function(dispatch : AppDispatch) {
        return getServerResponse(GET_USER_INFO_ENDPOINT, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken'),
            },
        })
        .then(res => {
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: res
                });
            return true;
        })
        .catch(error => {
            error.then((error: { message: string; }) => {
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
    return async function(dispatch : AppDispatch) {
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
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: res
                });
        })
        .catch(error => catchServerResponseError(error, dispatch))
}}

export function changeUserInfo(dataToPost : {name? : string, email? : string, password?: string}) {
    return async function(dispatch : AppDispatch) {
        getServerResponse(GET_USER_INFO_ENDPOINT, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('accessToken'),
            },
            body: JSON.stringify(dataToPost)
        })
        .then(res => {
                dispatch({
                    type: AUTH_SUCCESS,
                    payload: res,
                    password : dataToPost.password
                });
        })
        .catch(error => catchServerResponseError(error, dispatch))
    }
}

export function logout() {
    return async function(dispatch : AppDispatch) {
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
                dispatch({
                    type: LOGOUT
                });
                clearTokens();
        })
        .catch(error => catchServerResponseError(error, dispatch))
    }
}

export function resetPassword(navigate: NavigateFunction, dataToPost : {password : string, token : string}) {
    return async function(dispatch : AppDispatch) {
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
        .then(() => {
                navigate("/profile", {replace: true});
        })
        .catch(error => catchServerResponseError(error, dispatch))
    }
}

export function forgotPassword(navigate: NavigateFunction, location: Location, dataToPost : {}) {
    return async function(dispatch : AppDispatch) {
        getServerResponse(FORGOT_PASSWORD_ENDPOINT, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: dataToPost
            })
        })
        .then(() => {
                navigate("/reset-password", {state: { from: location.pathname}});
        })
        .catch(error => catchServerResponseError(error, dispatch))
    }
}

