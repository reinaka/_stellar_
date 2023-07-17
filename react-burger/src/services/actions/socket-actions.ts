export const WS_CONNECTION_START : 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS : 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR : 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_GET_MESSAGE : 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE : 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_CONNECTION_CLOSED : 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_START_USER : 'WS_CONNECTION_START_USER' = 'WS_CONNECTION_START_USER';

export interface wsConnectionStart {
    readonly type : typeof WS_CONNECTION_START,
    payload: Event
}

export interface wsConnectionSuccess {
    readonly type : typeof WS_CONNECTION_SUCCESS,
    payload : Event
}

export interface wsConnectionError {
    readonly type : typeof WS_CONNECTION_ERROR,
    payload : Event
}

export interface wsGetMessage {
    readonly type : typeof WS_GET_MESSAGE,
    payload : string
}

export interface wsSendMessage {
    readonly type : typeof WS_SEND_MESSAGE,
    payload: {}
}

export interface wsConnectionClosed {
    readonly type : typeof WS_CONNECTION_CLOSED,
    payload : Event
}

export type TSocketActions = wsConnectionStart 
                            | wsConnectionSuccess 
                            | wsConnectionError 
                            | wsGetMessage 
                            | wsSendMessage 
                            | wsConnectionClosed;

