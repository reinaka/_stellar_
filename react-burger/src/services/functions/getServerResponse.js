import { BASE_URL } from "../../constants/constants";
import { AUTH_FAILED } from "../actions/auth-actions";

export function checkServerResponse(res) {
    return res.ok
    ? res.json()
    : Promise.reject(res.json())
}

export async function getServerResponse(endpoint, options) {
    return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkServerResponse)
}

export function catchServerResponseError(error, dispatch) {
    return error.then(res => {
        dispatch({
            type: AUTH_FAILED,
            payload: res.message
        })
        throw new Error(`Error: ${res.message}`);
    })
}