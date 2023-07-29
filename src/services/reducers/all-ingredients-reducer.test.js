import { allIngredientsReducer, initialState } from "./all-ingredients-reducer";
import {
    UPLOAD_INGREDIENTS_DATA_REQUEST, 
    UPLOAD_INGREDIENTS_DATA_SUCCESS, 
    UPLOAD_INGREDIENTS_DATA_FAILED,
} from '../actions/all-ingredients-actions';

describe("all ingredients redicer", () => {
    it('should return initial state', () => {
        expect(allIngredientsReducer(undefined, {})).toEqual(
        {
            items: [],
            itemsRequest: false,
            itemsFailed: false,
        })
    })


    it('should handle UPLOAD_INGREDIENTS_DATA_REQUEST', () => {
        expect(
            allIngredientsReducer(initialState, {
                type: UPLOAD_INGREDIENTS_DATA_REQUEST
            })
            ).toEqual(
            {
                items: [],
                itemsRequest: true,
                itemsFailed: false,
            })
    })


    it('should handle UPLOAD_INGREDIENTS_DATA_SUCCESS', () => {
        expect(
            allIngredientsReducer(initialState, {
                type: UPLOAD_INGREDIENTS_DATA_SUCCESS,
                items: [
                    {
                        "_id":"60666c42cc7b410027a1a9b1",
                        "name":"Краторная булка N-200i",
                        "type":"bun",
                        "proteins":80,
                        "fat":24,
                        "carbohydrates":53,
                        "calories":420,
                        "price":1255,
                        "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                        "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                        "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                        "__v":0
                    },
                    {
                        "_id":"60666c42cc7b410027a1a9b5",
                        "name":"Говяжий метеорит (отбивная)",
                        "type":"main",
                        "proteins":800,
                        "fat":800,
                        "carbohydrates":300,
                        "calories":2674,
                        "price":3000,
                        "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                        "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                        "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                        "__v":0
                    }
                ]
            })
            ).toEqual(
            {
                items: [
                    {
                        "_id":"60666c42cc7b410027a1a9b1",
                        "name":"Краторная булка N-200i",
                        "type":"bun",
                        "proteins":80,
                        "fat":24,
                        "carbohydrates":53,
                        "calories":420,
                        "price":1255,
                        "image":"https://code.s3.yandex.net/react/code/bun-02.png",
                        "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                        "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
                        "__v":0
                    },
                    {
                        "_id":"60666c42cc7b410027a1a9b5",
                        "name":"Говяжий метеорит (отбивная)",
                        "type":"main",
                        "proteins":800,
                        "fat":800,
                        "carbohydrates":300,
                        "calories":2674,
                        "price":3000,
                        "image":"https://code.s3.yandex.net/react/code/meat-04.png",
                        "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                        "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
                        "__v":0
                    }
                ],
                itemsRequest: false,
                itemsFailed: false,
            })
    })

    it('should handle UPLOAD_INGREDIENTS_DATA_FAILED', () => {
        expect(
            allIngredientsReducer(initialState, {
                type: UPLOAD_INGREDIENTS_DATA_FAILED,
            })
            ).toEqual(
            {
                itemsFailed: true, 
                itemsRequest: false,
                items: []
            })
    })
})
