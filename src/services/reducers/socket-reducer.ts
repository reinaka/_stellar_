import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/socket-actions';
import { TSocketActions } from '../actions/socket-actions';

type TWSState = {
    wsConnected: boolean,
    orders: [],
    total: number | null,
    totalToday: number | null,
    error?: boolean
}

export const initialState: TWSState = {
    wsConnected: false,
    total: null,
    totalToday: null,
    orders: []
}; 

export const socketReducer = (state = initialState, action: TSocketActions) : TWSState => {
    switch (action.type) {
    case WS_CONNECTION_SUCCESS:
        return {
        ...state,
            error: undefined,
            wsConnected: true
    };

    case WS_CONNECTION_ERROR:
        return {
        ...state,
            error: true,
            wsConnected: false
    };

    case WS_CONNECTION_CLOSED:
        return initialState;

    case WS_GET_MESSAGE:
        const result = JSON.parse(action.payload);
        return {
        ...state,
            error: undefined,
            orders: result.orders,
            total: result.total,
            totalToday: result.totalToday
    };

    
    default:
    return state;
    }
}