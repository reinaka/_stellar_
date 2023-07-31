import { currentOrderReducer, initialState } from "./current-order-reducer";
import { ADD_CURRENT_ORDER_DETAILS, DELETE_CURRENT_ORDER_DETAILS} from '../actions/current-order-actions';
import { ORDER_FOR_TEST } from "../../constants/constants";

describe("currentIngredientReducer", () => {
    it('should return initial state', () => {
        expect(currentOrderReducer(undefined, {})).toEqual(null)
    })

    it('should handle ADD_CURRENT_ORDER_DETAILS', () => {
        expect(
            currentOrderReducer(initialState, {
                type: ADD_CURRENT_ORDER_DETAILS,
                payload: ORDER_FOR_TEST
            })
            ).toEqual(ORDER_FOR_TEST)
    })


    it('should handle DELETE_CURRENT_ORDER_DETAILS', () => {
        const currentState = ORDER_FOR_TEST
        expect(
            currentOrderReducer(currentState, {
                type: DELETE_CURRENT_ORDER_DETAILS,
            })).toEqual({})
    })
})
