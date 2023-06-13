import { GET_USER_INFO_ENDPOINT, GET_TOKEN_ENDPOINT } from "../../constants/constants";
import { UPDATE_TOKEN, AUTH_FAILED, VERIFY_USER } from "../actions/auth-actions";
import { saveTokens } from "./handleTokens";

async function verifyAccessToken(accessToken, refreshToken, dispatch) {
        return fetch(GET_USER_INFO_ENDPOINT, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            authorization: accessToken,
            },
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                dispatch({
                    type: VERIFY_USER,
                    payload: res,
                });
            } else {
                if(res.message === "jwt expired") {
                    verifyRefreshToken(refreshToken, dispatch)
                } else {
                    dispatch({
                        type: AUTH_FAILED,
                        payload: res.message
                    })
                }
            }
            return res.success;
        });
}

async function verifyRefreshToken(refreshToken, dispatch) {
        return fetch(GET_TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: refreshToken
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
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
            return res.success;
        })
}

export const checkAccess = (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if(!refreshToken) {
        return false;
    } else if(accessToken && refreshToken) {
        return verifyAccessToken(accessToken, refreshToken, dispatch);
    } else if (refreshToken) {
        return verifyRefreshToken(refreshToken, dispatch);
    } else return false;
};