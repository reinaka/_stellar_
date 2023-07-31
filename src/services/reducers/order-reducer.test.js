import { orderReducer, initialState } from "./order-reducer";
import { 
    UPLOAD_ORDER_DETAILS_REQUEST, 
    UPLOAD_ORDER_DETAILS_SUCCESS, 
    UPLOAD_ORDER_DETAILS_FAILED 
} from "../actions/order-details-actions";

describe('order reducer', () => {
    it('should return initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState)
    })

    it('should handle UPLOAD_ORDER_DETAILS_REQUEST', () => {
        expect(
            orderReducer(initialState, {
                type: UPLOAD_ORDER_DETAILS_REQUEST
            })
            ).toEqual(
            {
                ...initialState,
                orderNumRequest: true
            })
    })


    it('should handle UPLOAD_ORDER_DETAILS_SUCCESS', () => {
        expect(
            orderReducer(initialState, {
                type: UPLOAD_ORDER_DETAILS_SUCCESS,
                payload: 1255
            })
            ).toEqual(
            {
                ...initialState,
                orderNum: 1255
            })
    })


    it('should handle UPLOAD_ORDER_DETAILS_FAILED', () => {
        expect(
            orderReducer(initialState, {
                type: UPLOAD_ORDER_DETAILS_FAILED,
            })
            ).toEqual(
            {
                ...initialState,
                orderNumFailed: true
            })
    })
}) 