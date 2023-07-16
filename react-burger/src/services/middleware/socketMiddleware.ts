import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch } from '../types/thunkTypes';
import type { TAllActions } from '../types/actionTypes';
import { RootState } from '../types/thunkTypes';
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_CONNECTION_START_USER
} from '../actions/socket-actions';

export const socketMiddleware = (): Middleware => {
    const accessToken = localStorage.getItem('accessToken')!.replace('Bearer ', '');
    console.log(accessToken);
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TAllActions) => {
        const { dispatch } = store;
        const { type } = action;

        if (type === WS_CONNECTION_START) {
            // объект класса WebSocket
        socket = new WebSocket('wss://norma.nomoreparties.space/orders/all');
        } else if (type === WS_CONNECTION_START_USER) {
            // объект класса WebSocket
        socket = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${accessToken}`);
        }
        if (socket) {
        socket.onopen = event => {
            dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = event => {
            dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = event => {
            console.log(event);
            const { data } = event;
            dispatch({ type: WS_GET_MESSAGE, payload: data });
        };
        
        socket.onclose = event => {
            dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
            const { message }  = action;
            socket.send(JSON.stringify(message));
        }
    }

    next(action);
    };
    }) as Middleware;
}; 