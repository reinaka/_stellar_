import { currentOrderReducer, initialState } from "./current-order-reducer";
import { ADD_CURRENT_ORDER_DETAILS, DELETE_CURRENT_ORDER_DETAILS} from '../actions/current-order-actions';

describe("currentIngredientReducer", () => {
    it('should return initial state', () => {
        expect(currentOrderReducer(undefined, {})).toEqual(null)
    })

    it('should handle ADD_CURRENT_ORDER_DETAILS', () => {
        expect(
            currentOrderReducer(initialState, {
                type: ADD_CURRENT_ORDER_DETAILS,
                payload: {
                    createdAt: "2023-07-28T06:03:35.308Z",
                    ingredients: ['643d69a5c3f7b9001cfa0940', '643d69a5c3f7b9001cfa093d'],
                    name: "Метеоритный флюоресцентный бургер",
                    number: 14790,
                    status: "done",
                    updatedAt: "2023-07-28T06:03:35.457Z",
                    _id: "64c35a3782e277001bfa4c97"
                }
            })
            ).toEqual(
                {
                    createdAt: "2023-07-28T06:03:35.308Z",
                    ingredients: ['643d69a5c3f7b9001cfa0940', '643d69a5c3f7b9001cfa093d'],
                    name: "Метеоритный флюоресцентный бургер",
                    number: 14790,
                    status: "done",
                    updatedAt: "2023-07-28T06:03:35.457Z",
                    _id: "64c35a3782e277001bfa4c97"
                })
    })


    it('should handle DELETE_CURRENT_ORDER_DETAILS', () => {
        const currentState = {
            createdAt: "2023-07-28T06:03:35.308Z",
            ingredients: ['643d69a5c3f7b9001cfa0940', '643d69a5c3f7b9001cfa093d'],
            name: "Метеоритный флюоресцентный бургер",
            number: 14790,
            status: "done",
            updatedAt: "2023-07-28T06:03:35.457Z",
            _id: "64c35a3782e277001bfa4c97"
        }
        expect(
            currentOrderReducer(currentState, {
                type: DELETE_CURRENT_ORDER_DETAILS,
            })).toEqual({})
    })
})
