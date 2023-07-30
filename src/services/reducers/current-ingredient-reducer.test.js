import { currentIngredientReducer, initialState } from './current-ingredient-reducer';
import { ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS} from '../actions/current-ingredient-actions';

describe("currentIngredientReducer", () => {
    it('should return initial state', () => {
        expect(currentIngredientReducer(undefined, {})).toEqual(null)
    })

    it('should handle ADD_INGREDIENT_DETAILS', () => {
        expect(
            currentIngredientReducer(initialState, {
                type: ADD_INGREDIENT_DETAILS,
                payload: {
                    "_id":"60666c42cc7b410027a1a9b8",
                    "name":"Соус фирменный Space Sauce",
                    "type":"sauce",
                    "proteins":50,
                    "fat":22,
                    "carbohydrates":11,
                    "calories":14,
                    "price":80,
                    "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
                    "__v":0
                }
            })
            ).toEqual(
                {
                    "_id":"60666c42cc7b410027a1a9b8",
                    "name":"Соус фирменный Space Sauce",
                    "type":"sauce",
                    "proteins":50,
                    "fat":22,
                    "carbohydrates":11,
                    "calories":14,
                    "price":80,
                    "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
                    "__v":0
                })
    })


    it('should handle DELETE_INGREDIENT_DETAILS', () => {
        const currentState = {
            "_id":"60666c42cc7b410027a1a9b8",
            "name":"Соус фирменный Space Sauce",
            "type":"sauce",
            "proteins":50,
            "fat":22,
            "carbohydrates":11,
            "calories":14,
            "price":80,
            "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
            "__v":0
        }
        expect(
            currentIngredientReducer(currentState, {
                type: DELETE_INGREDIENT_DETAILS,
            })).toEqual({})
    })
})
