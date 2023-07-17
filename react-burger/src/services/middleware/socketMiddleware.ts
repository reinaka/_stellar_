import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch } from '../types/thunkTypes';
import { RootState } from '../types/thunkTypes';
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from '../actions/socket-actions';
import { WS_BASE_URL } from '../../constants/constants';
import { TSocketActions } from '../actions/socket-actions';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TSocketActions) => {
        const { dispatch } = store;
        const { type, payload } = action;
        if (type === WS_CONNECTION_START) {
            socket = new WebSocket(`${WS_BASE_URL}${payload}`);
        };

        if (socket) {
        socket.onopen = event => {
            dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = event => {
            dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = event => {
            const { data } = event;
            dispatch({ type: WS_GET_MESSAGE, payload: data });
        };
        
        socket.onclose = event => {
            dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
            const message  = action.payload;
            socket.send(JSON.stringify(message));
        }
    }

    next(action);
    };
    }) as Middleware;
}; 