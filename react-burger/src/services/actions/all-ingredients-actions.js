import { GET_INGREDIENTS_URL } from '../../constants/constants';
import { getServerResponse } from '../functions/getServerResponse';
export const UPLOAD_INGREDIENTS_DATA_REQUEST = 'UPLOAD_INGREDIENTS_DATA_REQUEST';
export const UPLOAD_INGREDIENTS_DATA_SUCCESS = 'UPLOAD_INGREDIENTS_DATA_SUCCESS';
export const UPLOAD_INGREDIENTS_DATA_FAILED = 'UPLOAD_INGREDIENTS_DATA_FAILED';

export function getData() {
    return async function(dispatch) {
        try {
            dispatch({
                type: UPLOAD_INGREDIENTS_DATA_REQUEST
            });
            const response = await getServerResponse(GET_INGREDIENTS_URL, {});
            dispatch({
                type: UPLOAD_INGREDIENTS_DATA_SUCCESS,
                items: response.data,
            })
        } catch (error) {
            dispatch({
                type: UPLOAD_INGREDIENTS_DATA_FAILED
            })
        }
    }
} 
