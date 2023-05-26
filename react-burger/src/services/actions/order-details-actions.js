import { GET_ORDER_NUMBER_URL } from '../../constants/constants';
import { checkServerResponse } from '../checkServerResponse';
export const UPLOAD_ORDER_DETAILS_REQUEST = 'UPLOAD_ORDER_DETAILS_REQUEST';
export const UPLOAD_ORDER_DETAILS_SUCCESS = 'UPLOAD_ORDER_DETAILS_SUCCESS';
export const UPLOAD_ORDER_DETAILS_FAILED = 'UPLOAD_ORDER_DETAILS_FAILED';

export const getOrderNum = (dataToPost) => {
    return function(dispatch) {
        dispatch({
            type: UPLOAD_ORDER_DETAILS_REQUEST
        });
        fetch(GET_ORDER_NUMBER_URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToPost)
        })
        .then(res => checkServerResponse(res))
        .then(res => {
            if(res.success) {
                dispatch({
                    type: UPLOAD_ORDER_DETAILS_SUCCESS,
                    payload: res.order.number,
                })
            } else {
                dispatch({
                    type: UPLOAD_ORDER_DETAILS_FAILED
                })
            }
        })
    }
}