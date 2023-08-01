import { constructorIngredientsReducer, initialState } from './constructor-ingredients-reducer';
import { 
    ADD_INGREDIENT_CONSTRUCTOR, 
    DELETE_INGREDIENT_CONSTRUCTOR, 
    ADD_BUN_CONSTRUCTOR,
    REORDER_INGREDIENTS_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR
} from '../actions/constructor-actions';
import { BUN_FOR_TEST, FILLING_FOR_TEST, SAUCE_FOR_TEST } from '../../constants/constants';

describe("constructor ingredients reducer", () => {
    it("Should return initial state", () => {
        expect(constructorIngredientsReducer(undefined, {})).toEqual(
            {
                selectedBun: null,
                items: [],
                totalCost: 0,
            })
        })

    it("Should handle ADD_BUN_CONSTRUCTOR", () => {
        expect(
            constructorIngredientsReducer(initialState, {
                type: ADD_BUN_CONSTRUCTOR,
                payload: BUN_FOR_TEST
            })
            ).toEqual(
            {
                selectedBun: BUN_FOR_TEST,
                items: [],
                totalCost: 2510,
            })
    })


    it("Should handle ADD_INGREDIENT_CONSTRUCTOR", () => {
        expect(
            constructorIngredientsReducer(initialState, {
                type: ADD_INGREDIENT_CONSTRUCTOR,
                payload: FILLING_FOR_TEST,
                uuid: 1234
            })
            ).toEqual(
            {
                selectedBun: null,
                items: [
                    {
                        ingredient: FILLING_FOR_TEST,
                        uuid: 1234
                    }
                ],
                totalCost: 3000,
            })
    })


    it("Should handle DELETE_INGREDIENT_CONSTRUCTOR", () => {
        const currentState = {
            selectedBun: null,
            items: [
                {
                    ingredient: FILLING_FOR_TEST,
                    uuid: 1234
                }
            ],
            totalCost: 3000,
        };
        expect(
            constructorIngredientsReducer(currentState, {
                type: DELETE_INGREDIENT_CONSTRUCTOR,
                payload: [],
                price: 3000
            })
            ).toEqual(
            {
                selectedBun: null,
                items: [],
                totalCost: 0,
            })
    })


    it("Should handle REORDER_INGREDIENTS_CONSTRUCTOR", () => {
        const currentState = {
            selectedBun: null,
            items: [
                {
                    ingredient: FILLING_FOR_TEST,
                    uuid: 1234
                },
                {
                    ingredient: SAUCE_FOR_TEST,
                    uuid: 5678
                }
            ],
            totalCost: 3080,
        };
        expect(
            constructorIngredientsReducer(currentState, {
                type: REORDER_INGREDIENTS_CONSTRUCTOR,
                uuid: 1234,
                index: 1
            })
            ).toEqual(
            {
                selectedBun: null,
                items: [
                    {
                        ingredient: SAUCE_FOR_TEST,
                        uuid: 5678
                    },
                    {
                        ingredient: FILLING_FOR_TEST,
                        uuid: 1234
                    }
                ],
                totalCost: 3080,
            })
    })


    it("Should handle CLEAR_CONSTRUCTOR", () => {
        const currentState = {
            selectedBun: BUN_FOR_TEST,
            items: [
                {
                    ingredient: FILLING_FOR_TEST,
                    uuid: 1234
                }
            ],
            totalCost: 3000,
        };
        expect(
            constructorIngredientsReducer(currentState, {
                type: CLEAR_CONSTRUCTOR,
            })
            ).toEqual(
            {
                selectedBun: null,
                items: [],
                totalCost: 0,
            })
    })
})
