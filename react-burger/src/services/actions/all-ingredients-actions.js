import { GET_INGREDIENTS_URL } from '../../constants/constants';
import { useIngredientsData } from '../../hooks/use-ingredients-data';

export const UPLOAD_INGREDIENTS_DATA_REQUEST = 'UPLOAD_INGREDIENTS_DATA_REQUEST';
export const UPLOAD_INGREDIENTS_DATA_SUCCESS = 'UPLOAD_INGREDIENTS_DATA_SUCCESS';
export const UPLOAD_INGREDIENTS_DATA_FAILED = 'UPLOAD_INGREDIENTS_DATA_FAILED';
export const INCREASE_INGREDIENT_QUANTITY = 'INCREASE_INGREDIENT_QUANTITY';
export const DECREASE_INGREDIENT_QUANTITY = 'DECREASE_INGREDIENT_QUANTITY';

export function getData() {
    return function(dispatch) {
        dispatch({
            type: UPLOAD_INGREDIENTS_DATA_REQUEST
        });
        useIngredientsData(GET_INGREDIENTS_URL)
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
