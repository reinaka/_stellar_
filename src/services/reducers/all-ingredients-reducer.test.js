import { allIngredientsReducer, initialState } from "./all-ingredients-reducer";
import {
    UPLOAD_INGREDIENTS_DATA_REQUEST, 
    UPLOAD_INGREDIENTS_DATA_SUCCESS, 
    UPLOAD_INGREDIENTS_DATA_FAILED,
} from '../actions/all-ingredients-actions';
import { BUN_FOR_TEST, FILLING_FOR_TEST } from "../../constants/constants";

describe("all ingredients redicer", () => {
    it('should return initial state', () => {
        expect(allIngredientsReducer(undefined, {})).toEqual(initialState);
    })


    it('should handle UPLOAD_INGREDIENTS_DATA_REQUEST', () => {
        expect(
            allIngredientsReducer(initialState, {
                type: UPLOAD_INGREDIENTS_DATA_REQUEST
            })
            ).toEqual(
            {
                ...initialState,
                itemsRequest: true
            })
    })


    it('should handle UPLOAD_INGREDIENTS_DATA_SUCCESS', () => {
        expect(
            allIngredientsReducer(initialState, {
                type: UPLOAD_INGREDIENTS_DATA_SUCCESS,
                items: [BUN_FOR_TEST, FILLING_FOR_TEST]
            })
            ).toEqual(
            {
                ...initialState,
                items: [BUN_FOR_TEST, FILLING_FOR_TEST]
            })
    })

    it('should handle UPLOAD_INGREDIENTS_DATA_FAILED', () => {
        expect(
            allIngredientsReducer(initialState, {
                type: UPLOAD_INGREDIENTS_DATA_FAILED,
            })
            ).toEqual(
            {
                ...initialState,
                itemsFailed: true
            })
    })
})
