import { currentIngredientReducer, initialState } from './current-ingredient-reducer';
import { ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS} from '../actions/current-ingredient-actions';
import { SAUCE_FOR_TEST } from '../../constants/constants';

describe("currentIngredientReducer", () => {
    it('should return initial state', () => {
        expect(currentIngredientReducer(undefined, {})).toEqual(null)
    })

    it('should handle ADD_INGREDIENT_DETAILS', () => {
        expect(
            currentIngredientReducer(initialState, {
                type: ADD_INGREDIENT_DETAILS,
                payload: SAUCE_FOR_TEST
            })
            ).toEqual(
                SAUCE_FOR_TEST)
    })


    it('should handle DELETE_INGREDIENT_DETAILS', () => {
        const currentState = SAUCE_FOR_TEST
        expect(
            currentIngredientReducer(currentState, {
                type: DELETE_INGREDIENT_DETAILS,
            })).toEqual({})
    })
})
