import {
    UPLOAD_ORDER_DETAILS_REQUEST,
    UPLOAD_ORDER_DETAILS_SUCCESS,
    UPLOAD_ORDER_DETAILS_FAILED
} from '../actions/order-details-actions';

const initialState = {
    ordenNum: null,
    orderNumRequest: false,
    orderNumFailed: false,
};

export const orderReducer  = (state=initialState, action) => {
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
            }
        }
    default: {
        return state;
    }
}
};