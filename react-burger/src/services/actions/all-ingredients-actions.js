import { GET_INGREDIENTS_URL } from '../../constants/constants';
import { checkServerResponse } from '../checkServerResponse';
export const UPLOAD_INGREDIENTS_DATA_REQUEST = 'UPLOAD_INGREDIENTS_DATA_REQUEST';
export const UPLOAD_INGREDIENTS_DATA_SUCCESS = 'UPLOAD_INGREDIENTS_DATA_SUCCESS';
export const UPLOAD_INGREDIENTS_DATA_FAILED = 'UPLOAD_INGREDIENTS_DATA_FAILED';

export function getData() {
    return function(dispatch) {
        dispatch({
            type: UPLOAD_INGREDIENTS_DATA_REQUEST
        });
        fetch(GET_INGREDIENTS_URL)
        .then(res => checkServerResponse(res))
        .then(res => {
            if(res.success) {
                dispatch({
                    type: UPLOAD_INGREDIENTS_DATA_SUCCESS,
                    items: res.data,
                })
            } else {
                dispatch({
                    type: UPLOAD_INGREDIENTS_DATA_FAILED
                })
            }
        })
    }
} 
