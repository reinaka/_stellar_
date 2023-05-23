import { ADD_INGREDIENT_CONSTRUCTOR, DELETE_INGREDIENT_CONSTRUCTOR, ADD_BUN_CONSTRUCTOR} from '../actions/constructor-actions';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    selectedBun: null,
    items: [],
    totalCost: 0,
};

export const constructorIngredientsReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_INGREDIENT_CONSTRUCTOR: {
            const ingredient = {
                ingredient: action.payload,
                uuid: uuidv4(),
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
                            ? (state.totalCost - state.selectedBun.price*2 + action.payload.price*2) 
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
        default: {
            return state;
        }
}}