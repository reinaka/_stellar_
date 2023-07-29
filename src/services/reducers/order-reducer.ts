import {
    UPLOAD_ORDER_DETAILS_REQUEST,
    UPLOAD_ORDER_DETAILS_SUCCESS,
    UPLOAD_ORDER_DETAILS_FAILED
} from '../actions/order-details-actions';

import { TOrderActions } from '../actions/order-details-actions';

type TState = {
    orderNum: number | null,
    orderNumRequest: boolean,
    orderNumFailed: boolean,
}

export const initialState : TState = {
    orderNum: null,
    orderNumRequest: false,
    orderNumFailed: false,
};

export const orderReducer  = (state=initialState, action : TOrderActions) : TState => {
    switch(action.type) {
        case UPLOAD_ORDER_DETAILS_REQUEST: {
            return {
                ...state,
                orderNumRequest: true
            }
        }
        case UPLOAD_ORDER_DETAILS_SUCCESS: {
            return {
                ...state,
                orderNumRequest: false,
                orderNumFailed: false,
                orderNum: action.payload
            }
        }
        case UPLOAD_ORDER_DETAILS_FAILED: {
            return {
                ...state,
                orderNumRequest: false,
                orderNumFailed: true,
                orderNum: null
            }
        }
    default: {
        return state;
    }
}
};