import { authReducer, initialState } from "./auth-reducer";
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILED, UPDATE_TOKEN, LOGOUT, AUTH_CHECKED } from '../actions/auth-actions';

describe("auth reducer", () => {
    it('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual(
        {
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
                    "password" : ""
                }
            }
        })
    })


    it('should handle AUTH_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: AUTH_REQUEST
            })
            ).toEqual(
            {
                requestFailed: false,
                authError: null,
                requestPending: true,
                isAuthChecked: false,
                userData: {
                    "success": false,
                    "accessToken": "",
                    "refreshToken": "",
                    "user": {
                        "email": "",
                        "name": "",
                        "password" : ""
                    }
                }
            })
        })


    it('should handle AUTH_SUCCESS', () => {
        expect(
            authReducer(initialState, {
                type: AUTH_SUCCESS,
                payload: {
                    success : true,
                    user : {
                        name: "Kate",
                        email: "kate@gmail.com"
                    }
                },
                password: "1234567"
            })
            ).toEqual(
            {
                requestFailed: false,
                authError: null,
                requestPending: false,
                isAuthChecked: false,
                userData: {
                    "success": true,
                    "accessToken": "",
                    "refreshToken": "",
                    "user": {
                        "email": "kate@gmail.com",
                        "name": "Kate",
                        "password" : "1234567"
                    }
                }
            })
        })


    it('should handle AUTH_FAILED', () => {
        expect(
            authReducer(initialState, {
                type: AUTH_FAILED,
                payload: "Error message"
            })
            ).toEqual(
            {
                requestFailed: true,
                authError: "Error message",
                requestPending: false,
                isAuthChecked: false,
                userData: {
                    "success": false,
                    "accessToken": "",
                    "refreshToken": "",
                    "user": {
                        "email": "",
                        "name": "",
                        "password" : ""
                    }
                }
            })
        })


    it('should handle UPDATE_TOKEN', () => {
        expect(
            authReducer(initialState, {
                type: UPDATE_TOKEN,
                payload: {
                    accessToken: "access12345",
                    refreshToken: "refresh12345"
                }
            })
            ).toEqual(
            {
                requestFailed: false,
                authError: null,
                requestPending: false,
                isAuthChecked: false,
                userData: {
                    "success": true,
                    "accessToken": "access12345",
                    "refreshToken": "refresh12345",
                    "user": {
                        "email": "",
                        "name": "",
                        "password" : ""
                    }
                }
            })
        })


    it('should handle LOGOUT', () => {
        expect(
            authReducer(initialState, {
                type: LOGOUT
            })
            ).toEqual(
                {
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
                            "password" : ""
                        }
                    }
                })
        })

    it('should handle AUTH_CHECKED', () => {
        expect(
            authReducer(initialState, {
                type: AUTH_CHECKED
            })
            ).toEqual(
                {
                    requestFailed: false,
                    authError: null,
                    requestPending: false,
                    isAuthChecked: true,
                    userData: {
                        "success": false,
                        "accessToken": "",
                        "refreshToken": "",
                        "user": {
                            "email": "",
                            "name": "",
                            "password" : ""
                        }
                    }
                })
        })
})