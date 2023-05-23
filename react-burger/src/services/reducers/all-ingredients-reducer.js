import {
        UPLOAD_INGREDIENTS_DATA_REQUEST, 
        UPLOAD_INGREDIENTS_DATA_SUCCESS, 
        UPLOAD_INGREDIENTS_DATA_FAILED,
        INCREASE_INGREDIENT_QUANTITY, 
        DECREASE_INGREDIENT_QUANTITY
    } from '../actions/all-ingredients-actions';
import { BUN } from '../../constants/constants';

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
                items: action.items.map(item => ({
                    ingredient: item,
                    quantity: null
                })),
                itemsFailed: false,  
                itemsRequest: false,
            }
        }
        case UPLOAD_INGREDIENTS_DATA_FAILED: {
            return {
                ...state, 
                itemsFailed: true, 
                itemsRequest: false,
            }
        }
        case INCREASE_INGREDIENT_QUANTITY: {
            let changedItem ={};
            const newItems = state.items.map(item => {
                if(item.ingredient.type !== BUN && item.ingredient._id === action.id) {
                    changedItem = {
                        ingredient: {...item.ingredient},
                        quantity: item.quantity + 1
                    }
                } else if (item.ingredient.type === BUN) {
                    if(item.ingredient._id === action.id) {
                    changedItem = {
                        ingredient: {...item.ingredient},
                        quantity: 2
                        }
                    }
                    else {
                        action.checkType === BUN
                        ? changedItem = {
                            ingredient: {...item.ingredient},
                            quantity: null
                        }
                        : changedItem = {...item}
                    }
                }
                else {
                    changedItem = {...item};
                }
                return changedItem;
            })
            return {
                ...state,
                items: newItems,
            }
        }
        case DECREASE_INGREDIENT_QUANTITY: {
            let changedItem ={};
            const newItems = state.items.map(item => {
                if(action.type === BUN) {
                    changedItem = {...item}
                } else {
                    action.id === item.ingredient._id
                    ? changedItem = {
                            ingredient: {...item.ingredient},
                            quantity: item.quantity > 1
                            ? item.quantity - 1
                            : null
                    }
                    : changedItem = {...item}
                }
                return changedItem
            });
            return {
                ...state,
                items: newItems
            }
        }
        default: {
            return state;
        }
    }
};