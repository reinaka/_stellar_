import { socketReducer, initialState } from "./socket-reducer";
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/socket-actions';
import { ORDER_DETAILS_FOR_TEST } from "../../constants/constants";

describe("socket reducer", () => {
    it('should return initial state', () => {
        expect(socketReducer(undefined, {})).toEqual(initialState)
    })


    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            socketReducer(initialState, {
                type: WS_CONNECTION_SUCCESS
            })
            ).toEqual(
            {
                ...initialState,
                wsConnected: true
            })
    })


    it('should handle WS_CONNECTION_ERROR', () => {
        expect(
            socketReducer(initialState, {
                type: WS_CONNECTION_ERROR
            })
            ).toEqual(
            {
                ...initialState,
                error: true
            })
    })


    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            socketReducer(initialState, {
                type: WS_CONNECTION_CLOSED
            })
            ).toEqual(initialState)
    })


    it('should handle WS_GET_MESSAGE', () => {
        const orderJson = JSON.stringify(
            {
                "success": "true",
                "orders":[ORDER_DETAILS_FOR_TEST, ORDER_DETAILS_FOR_TEST],
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
                orders: [ORDER_DETAILS_FOR_TEST, ORDER_DETAILS_FOR_TEST],
                total: 2030,
                totalToday: 123
            })
    })
})