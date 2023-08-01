import { 
        ADD_INGREDIENT_CONSTRUCTOR, 
        DELETE_INGREDIENT_CONSTRUCTOR, 
        ADD_BUN_CONSTRUCTOR,
        REORDER_INGREDIENTS_CONSTRUCTOR,
        CLEAR_CONSTRUCTOR
    } from '../actions/constructor-actions';
import { TIngredient, TIngredientWithUUID } from '../types/types';
import { TConstructorActions } from '../actions/constructor-actions';

type TState = {
    selectedBun: null | TIngredient,
    items: TIngredientWithUUID[] | [],
    totalCost: number,
};

export const initialState : TState = {
    selectedBun: null,
    items: [],
    totalCost: 0,
};

export const constructorIngredientsReducer = (state=initialState, action : TConstructorActions) : TState => {
    switch(action.type) {
        case ADD_INGREDIENT_CONSTRUCTOR: {
            const ingredient = {
                ingredient: action.payload,
                uuid: action.uuid,
            }
            return {
                ...state,
                items: [...state.items, ingredient],
                totalCost: state.totalCost + ingredient.ingredient.price,
            }
        }
        case ADD_BUN_CONSTRUCTOR: {
            if(state.selectedBun && action.payload._id === state.selectedBun._id) return state;
            return {
                ...state,
                selectedBun: action.payload,
                totalCost: state.selectedBun 
                            ? (state.totalCost - state.selectedBun.price * 2 + action.payload.price * 2) 
                            : state.totalCost + action.payload.price * 2,
            }
        }
        case DELETE_INGREDIENT_CONSTRUCTOR: {
            return {
                ...state,
                items: action.payload,
                totalCost: state.totalCost - action.price,
            }
        }
        case REORDER_INGREDIENTS_CONSTRUCTOR: {
            let newOrderList = state.items.slice();
            const originalIndex = state.items.findIndex(item => item.uuid === action.uuid);
            const draggableItem = state.items[originalIndex];

            newOrderList.splice(originalIndex, 1);
            newOrderList.splice(action.index, 0, draggableItem);
            return {
                ...state,
                items: newOrderList,
            }
        }
        case CLEAR_CONSTRUCTOR: {
            return initialState;
        }
        default: {
            return state;
        }
}}