import { TOrder } from "../types/types";

export const ADD_CURRENT_ORDER_DETAILS : 'ADD_CURRENT_ORDER_DETAILS' = 'ADD_CURRENT_ORDER_DETAILS';
export const DELETE_CURRENT_ORDER_DETAILS : 'DELETE_CURRENT_ORDER_DETAILS' = 'DELETE_CURRENT_ORDER_DETAILS';

export interface IAddCurrentOrderDetails {
    readonly type : typeof ADD_CURRENT_ORDER_DETAILS,
    readonly payload : TOrder
}

export interface IDeleteCurrentOrderDetails {
    readonly type : typeof DELETE_CURRENT_ORDER_DETAILS
}

export type TCurrentOrderActions = IAddCurrentOrderDetails | IDeleteCurrentOrderDetails;