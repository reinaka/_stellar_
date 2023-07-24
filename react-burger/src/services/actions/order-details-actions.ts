import { GET_ORDER_NUMBER_ENDPOINT } from '../../constants/constants';
import { getServerResponse } from '../functions/getServerResponse';
import { CLEAR_CONSTRUCTOR } from './constructor-actions';
import { AppDispatch } from '../types/thunkTypes';

export const UPLOAD_ORDER_DETAILS_REQUEST : 'UPLOAD_ORDER_DETAILS_REQUEST' = 'UPLOAD_ORDER_DETAILS_REQUEST';
export const UPLOAD_ORDER_DETAILS_SUCCESS : 'UPLOAD_ORDER_DETAILS_SUCCESS' = 'UPLOAD_ORDER_DETAILS_SUCCESS';
export const UPLOAD_ORDER_DETAILS_FAILED : 'UPLOAD_ORDER_DETAILS_FAILED' = 'UPLOAD_ORDER_DETAILS_FAILED';

export interface IOrderRequestAction {
    readonly type : typeof UPLOAD_ORDER_DETAILS_REQUEST
}

export interface IOrderSuccess {
    readonly type : typeof UPLOAD_ORDER_DETAILS_SUCCESS,
    readonly payload : number
}

export interface IOrderFailed {
    readonly type : typeof UPLOAD_ORDER_DETAILS_FAILED
}

export type TOrderActions = IOrderRequestAction | IOrderSuccess | IOrderFailed;

export const getOrderNum = (dataToPost : {"ingredients" : string[]}) => {
    return async function(dispatch : AppDispatch) {
        try {
            dispatch({
                type: UPLOAD_ORDER_DETAILS_REQUEST
            });
            getServerResponse(GET_ORDER_NUMBER_ENDPOINT, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(dataToPost)
            })
            .then(res => {
                    dispatch({
                        type: UPLOAD_ORDER_DETAILS_SUCCESS,
                        payload: res.order.number,
                    })
                    dispatch({
                        type: CLEAR_CONSTRUCTOR
                    })
                }
            )
        } catch (e) {
            dispatch({
                type: UPLOAD_ORDER_DETAILS_FAILED
            })
        }
    }
}