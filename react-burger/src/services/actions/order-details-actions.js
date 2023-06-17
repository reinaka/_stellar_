import { GET_ORDER_NUMBER_URL } from '../../constants/constants';
import { getServerResponse } from '../functions/getServerResponse';
import { CLEAR_CONSTRUCTOR } from './constructor-actions';
export const UPLOAD_ORDER_DETAILS_REQUEST = 'UPLOAD_ORDER_DETAILS_REQUEST';
export const UPLOAD_ORDER_DETAILS_SUCCESS = 'UPLOAD_ORDER_DETAILS_SUCCESS';
export const UPLOAD_ORDER_DETAILS_FAILED = 'UPLOAD_ORDER_DETAILS_FAILED';

export const getOrderNum = (dataToPost) => {
    return async function(dispatch) {
        try {
            dispatch({
                type: UPLOAD_ORDER_DETAILS_REQUEST
            });
            getServerResponse(GET_ORDER_NUMBER_URL, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToPost)
            })
            .then(res => {
                if(res.success) {
                    dispatch({
                        type: UPLOAD_ORDER_DETAILS_SUCCESS,
                        payload: res.order.number,
                    })
                    dispatch({
                        type: CLEAR_CONSTRUCTOR
                    })
                }
            })
        } catch (error) {
            dispatch({
                type: UPLOAD_ORDER_DETAILS_FAILED
            })
            throw new Error(`Ошибка: ${error}`);
        }
    }
}