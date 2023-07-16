import { TIngredient } from '../types/types';
import { GET_INGREDIENTS_ENDPOINT } from '../../constants/constants';
import { getServerResponse } from '../functions/getServerResponse';
import { AppDispatch } from '../types/thunkTypes';

export const UPLOAD_INGREDIENTS_DATA_REQUEST : 'UPLOAD_INGREDIENTS_DATA_REQUEST' = 'UPLOAD_INGREDIENTS_DATA_REQUEST';
export const UPLOAD_INGREDIENTS_DATA_SUCCESS : 'UPLOAD_INGREDIENTS_DATA_SUCCESS' = 'UPLOAD_INGREDIENTS_DATA_SUCCESS';
export const UPLOAD_INGREDIENTS_DATA_FAILED : 'UPLOAD_INGREDIENTS_DATA_FAILED'= 'UPLOAD_INGREDIENTS_DATA_FAILED';

export interface IUploadIngredientsAction {
    readonly type : typeof UPLOAD_INGREDIENTS_DATA_REQUEST,
    readonly itemsRequest : boolean
}

export interface IIngredientsSuccessAction {
    readonly type : typeof UPLOAD_INGREDIENTS_DATA_SUCCESS,
    readonly items: TIngredient[],
    readonly itemsFailed: boolean,  
    readonly itemsRequest: boolean,
}

export interface IIngredientsFailed {
    readonly type : typeof UPLOAD_INGREDIENTS_DATA_FAILED,
    readonly itemsFailed: boolean, 
    readonly itemsRequest: boolean,
    readonly items: []
}

export type TIngredientsActions = IUploadIngredientsAction | IIngredientsSuccessAction | IIngredientsFailed;

export function getData() {
    return async function(dispatch : AppDispatch) { 
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
