import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch } from '../types/thunkTypes';
import { RootState } from '../types/thunkTypes';
import { WS_BASE_URL } from '../../constants/constants';
import { TWSActions, TSocketActions } from '../actions/socket-actions';

export const socketMiddleware = (wsActions: TWSActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: TSocketActions) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, onOpen, onClosed, onError, onMessage, onSendMessage } = wsActions;

        if (type === wsInit) {
            socket = new WebSocket(`${WS_BASE_URL}${payload}`);
        };

        if (socket) {
        socket.onopen = event => {
            dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
            dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
            const { data } = event;
            dispatch({ type: onMessage, payload: data });
        };
        
        socket.onclose = event => {
            dispatch({ type: onClosed, payload: event });
        };

        if (type === onSendMessage) {
            const message  = action.payload;
            socket.send(JSON.stringify(message));
        }
    }

    next(action);
    };
    }) as Middleware;
}; 