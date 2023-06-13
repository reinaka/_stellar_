import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILED, UPDATE_TOKEN, VERIFY_USER, LOGOUT } from '../actions/auth-actions';

const initialState = {
    requestFailed: false,
    authError: null,
    requestPending: false,
    userData: {
        "success": false,
        "accessToken": "",
        "refreshToken": "",
        "user": {
            "email": "",
            "name": "",
        }
    }
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_REQUEST: {
            return {
                ...state,
                requestPending: true,
            }
        }
        case AUTH_SUCCESS: {
            return {
                ...state,
                requestFailed: false,
                authError: null,
                requestPending: false,
                userData: action.payload
            }
        }
        case UPDATE_TOKEN: {
            return {
                ...state,
                requestFailed: false,
                authError: null,
                requestPending: false,
                userData: {
                    ...state.userData,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                }
            }
        }
        case VERIFY_USER: {
            return {
                ...state,
                requestFailed: false,
                authError: null,
                requestPending: false,
                userData: {
                    ...state.userData,
                    success: action.payload.success,
                    user: action.payload.user,
                }
            }
        }
        case LOGOUT: {
            return initialState;
        }
        case AUTH_FAILED: {
            return {
                ...state,
                requestFailed: true,
                authError: action.payload,
                requestPending: false,
                userData: initialState.userData,
            }
        }
        default: {
            return state;
        }
    }
}