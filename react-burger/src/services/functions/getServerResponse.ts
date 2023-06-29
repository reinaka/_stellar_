import { BASE_URL } from "../../constants/constants";
import { AUTH_FAILED } from "../actions/auth-actions";

export function checkServerResponse(res : Response) {
    return res.ok
    ? res.json()
    : Promise.reject(res.json())
}

function checkSuccess(res: { success: any; }) {
    return (res && res.success)
    ? res
    : Promise.reject(`Ответ не success: ${res}`)
}

export async function getServerResponse(endpoint : string, options? : {}) {
    return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkServerResponse)
    .then(checkSuccess)
}

export function catchServerResponseError(error: Promise<any>, dispatch : any) {
    return error.then(res => {
        dispatch({
            type: AUTH_FAILED,
            payload: res.message
        })
    })
}