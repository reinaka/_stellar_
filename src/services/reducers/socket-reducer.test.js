import { socketReducer, initialState } from "./socket-reducer";
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/socket-actions';

describe("socket reducer", () => {
    it('should return initial state', () => {
        expect(socketReducer(undefined, {})).toEqual(
        {
            wsConnected: false,
            total: null,
            totalToday: null,
            orders: []
        })
    })


    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            socketReducer(initialState, {
                type: WS_CONNECTION_SUCCESS
            })
            ).toEqual(
            {
                wsConnected: true,
                total: null,
                totalToday: null,
                orders: []
            })
    })


    it('should handle WS_CONNECTION_ERROR', () => {
        expect(
            socketReducer(initialState, {
                type: WS_CONNECTION_ERROR
            })
            ).toEqual(
            {
                wsConnected: false,
                total: null,
                totalToday: null,
                orders: [],
                error: true
            })
    })


    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            socketReducer(initialState, {
                type: WS_CONNECTION_CLOSED
            })
            ).toEqual(
            {
                wsConnected: false,
                total: null,
                totalToday: null,
                orders: []
            })
    })


    it('should handle WS_GET_MESSAGE', () => {
        const orderJson = JSON.stringify(
            {
                "success": "true",
                "orders":[
                        {"_id":"64c38c5b82e277001bfa4d1d",
                            "ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa0943"],
                            "status":"done",
                            "name":"Space краторный бургер",
                            "createdAt":"2023-07-28T09:37:31.718Z",
                            "updatedAt":"2023-07-28T09:37:31.864Z",
                            "number":14807},
                        {"_id":"64c38b8382e277001bfa4d1c",
                            "ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa0943"],
                            "status":"done",
                            "name":"Space краторный бургер",
                            "createdAt":"2023-07-28T09:33:55.496Z",
                            "updatedAt":"2023-07-28T09:33:55.632Z",
                            "number":14806}
                ],
                total: 2030,
                totalToday: 123
            }
        )

        expect(
            socketReducer(initialState, {
                type: WS_GET_MESSAGE,
                payload: orderJson
            })
            ).toEqual(
            {
                wsConnected: false,
                orders: [
                {
                    "_id":"64c38c5b82e277001bfa4d1d",
                    "ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa0943"],
                    "status":"done",
                    "name":"Space краторный бургер",
                    "createdAt":"2023-07-28T09:37:31.718Z",
                    "updatedAt":"2023-07-28T09:37:31.864Z",
                    "number":14807},
                {
                    "_id":"64c38b8382e277001bfa4d1c",
                    "ingredients":["643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa093c","643d69a5c3f7b9001cfa0943"],
                    "status":"done",
                    "name":"Space краторный бургер",
                    "createdAt":"2023-07-28T09:33:55.496Z",
                    "updatedAt":"2023-07-28T09:33:55.632Z",
                    "number":14806},
                ],
                total: 2030,
                totalToday: 123
            })
    })
})