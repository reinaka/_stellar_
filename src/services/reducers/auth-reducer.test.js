import { authReducer, initialState } from "./auth-reducer";
import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILED, UPDATE_TOKEN, LOGOUT, AUTH_CHECKED } from '../actions/auth-actions';

describe("auth reducer", () => {
    it('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState);
    })


    it('should handle AUTH_REQUEST', () => {
        expect(
            authReducer(initialState, {
                type: AUTH_REQUEST
            })
            ).toEqual(
            {
                ...initialState,
                requestPending: true
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
                ...initialState,
                userData: {
                    ...initialState.userData,
                    "success": true,
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
                ...initialState,
                requestFailed: true,
                authError: "Error message"
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
                ...initialState,
                userData: {
                    ...initialState.userData,
                    "success": true,
                    "accessToken": "access12345",
                    "refreshToken": "refresh12345"
                }
            })
        })


    it('should handle LOGOUT', () => {
        expect(
            authReducer(initialState, {
                type: LOGOUT
            })
            ).toEqual(initialState)
        })

    it('should handle AUTH_CHECKED', () => {
        expect(
            authReducer(initialState, {
                type: AUTH_CHECKED
            })
            ).toEqual(
                {
                    ...initialState,
                    isAuthChecked: true
                })
        })
})