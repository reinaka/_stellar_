import { GET_INGREDIENTS_ENDPOINT } from '../../constants/constants';
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
            getServerResponse(GET_INGREDIENTS_ENDPOINT)
            .then(res => {
                    dispatch({
                        type: UPLOAD_INGREDIENTS_DATA_SUCCESS,
                        items: res.data,
                    })
                }
            )
        }
        catch(error) {
            dispatch({
                type: UPLOAD_INGREDIENTS_DATA_FAILED
            })
        }
    }
} 
