import { BASE_URL } from "../../constants/constants";
import { AUTH_FAILED } from "../actions/auth-actions";
import { AppDispatch } from "../types/thunkTypes";

type TRequestOptions = {
    method : 'GET' | 'POST' | 'PATCH',
    headers : {},
    body? : string 
}

export function checkServerResponse(res : Response) {
    return res.ok
    ? res.json()
    : Promise.reject(res.json())
}

function checkSuccess(res: any) {
    return (res && res.success)
    ? res
    : Promise.reject(`Ответ не success: ${res}`)
}

export async function getServerResponse(endpoint : string, options? : TRequestOptions) {
    return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkServerResponse)
    .then(checkSuccess)
}

export function catchServerResponseError(error: Promise<Error>, dispatch : AppDispatch) {
    return error.then(res => {
        dispatch({
            type: AUTH_FAILED,
            payload: res.message
        })
    })
}