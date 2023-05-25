import {
        UPLOAD_INGREDIENTS_DATA_REQUEST, 
        UPLOAD_INGREDIENTS_DATA_SUCCESS, 
        UPLOAD_INGREDIENTS_DATA_FAILED,
    } from '../actions/all-ingredients-actions';

const initialState = {
    items: [],
    itemsRequest: false,
    itemsFailed: false,
};

export const allIngredientsReducer = (state = initialState, action) => {
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