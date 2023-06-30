import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILED, UPDATE_TOKEN, LOGOUT, AUTH_CHECKED } from '../actions/auth-actions';

const initialState = {
    requestFailed: false,
    authError: null,
    requestPending: false,
    isAuthChecked: false,
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
                userData: {
                    ...state.userData,
                    success: action.payload.success,
                    user: {
                        ...action.payload.user,
                        password: action.password,
                    },
                }
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
                    success: true,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                }
            }
        }
        case LOGOUT: {
            return {
                ...state,
                userData: initialState.userData,
            }
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
        case AUTH_CHECKED: {
            return {
                ...state,
                isAuthChecked: true,
            }
        }
        default: {
            return state;
        }
    }
}