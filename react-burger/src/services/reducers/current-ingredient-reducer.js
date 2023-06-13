import { ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS} from '../actions/current-ingredient-actions';

const initialState = null;

export const currentIngredientReducer = (state=initialState, action) => {
    switch(action.type) {
        case ADD_INGREDIENT_DETAILS: {
        return action.payload
    }
    case DELETE_INGREDIENT_DETAILS: {
        return {}
    }
    default: {
        return state;
    }
    }
};