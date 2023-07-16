import {
        UPLOAD_INGREDIENTS_DATA_REQUEST, 
        UPLOAD_INGREDIENTS_DATA_SUCCESS, 
        UPLOAD_INGREDIENTS_DATA_FAILED,
    } from '../actions/all-ingredients-actions';
import { TIngredientsActions } from '../actions/all-ingredients-actions';
import { TIngredient } from '../types/types';

type TState = {
    items: TIngredient[],
    itemsRequest: boolean,
    itemsFailed: boolean,
};

const initialState : TState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
};

export const allIngredientsReducer = (state = initialState, action : TIngredientsActions) : TState => {
    switch(action.type) {
        case UPLOAD_INGREDIENTS_DATA_REQUEST: {
            return {
                ...state,
                itemsRequest: true,
            }
        }
        case UPLOAD_INGREDIENTS_DATA_SUCCESS: {
            return {
                ...state, 
                items: action.items,
                itemsFailed: false,  
                itemsRequest: false,
            }
        }
        case UPLOAD_INGREDIENTS_DATA_FAILED: {
            return {
                ...state, 
                itemsFailed: true, 
                itemsRequest: false,
                items: []
            }
        }
        default: {
            return state;
        }
    }
};