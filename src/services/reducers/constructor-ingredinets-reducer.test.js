import { constructorIngredientsReducer, initialState } from './constructor-ingredients-reducer';
import { 
    ADD_INGREDIENT_CONSTRUCTOR, 
    DELETE_INGREDIENT_CONSTRUCTOR, 
    ADD_BUN_CONSTRUCTOR,
    REORDER_INGREDIENTS_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR
} from '../actions/constructor-actions';

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
                payload: {
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
                }
            })
            ).toEqual(
            {
                selectedBun: {
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
                items: [],
                totalCost: 2510,
            })
    })


    it("Should handle ADD_INGREDIENT_CONSTRUCTOR", () => {
        expect(
            constructorIngredientsReducer(initialState, {
                type: ADD_INGREDIENT_CONSTRUCTOR,
                payload: {
                    "_id":"60666c42cc7b410027a1a9b7",
                    "name":"Соус Spicy-X",
                    "type":"sauce",
                    "proteins":30,
                    "fat":20,
                    "carbohydrates":40,
                    "calories":30,
                    "price":90,
                    "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
                    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                    "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
                    "__v":0
                },
                uuid: 1234
            })
            ).toEqual(
            {
                selectedBun: null,
                items: [
                    {
                        ingredient: {
                            "_id":"60666c42cc7b410027a1a9b7",
                            "name":"Соус Spicy-X",
                            "type":"sauce",
                            "proteins":30,
                            "fat":20,
                            "carbohydrates":40,
                            "calories":30,
                            "price":90,
                            "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
                            "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                            "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
                            "__v":0
                        },
                        uuid: 1234
                    }
                ],
                totalCost: 90,
            })
    })


    it("Should handle DELETE_INGREDIENT_CONSTRUCTOR", () => {
        const currentState = {
            selectedBun: null,
            items: [
                {
                    ingredient: {
                        "_id":"60666c42cc7b410027a1a9b7",
                        "name":"Соус Spicy-X",
                        "type":"sauce",
                        "proteins":30,
                        "fat":20,
                        "carbohydrates":40,
                        "calories":30,
                        "price":90,
                        "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
                        "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                        "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
                        "__v":0
                    },
                    uuid: 1234
                }
            ],
            totalCost: 90,
        };
        expect(
            constructorIngredientsReducer(currentState, {
                type: DELETE_INGREDIENT_CONSTRUCTOR,
                payload: [],
                price: 90
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
                    ingredient: {
                        "_id":"60666c42cc7b410027a1a9b7",
                        "name":"Соус Spicy-X",
                        "type":"sauce",
                        "proteins":30,
                        "fat":20,
                        "carbohydrates":40,
                        "calories":30,
                        "price":90,
                        "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
                        "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                        "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
                        "__v":0
                    },
                    uuid: 1234
                },
                {
                    ingredient: {
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
                    },
                    uuid: 5678
                }
            ],
            totalCost: 170,
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
                        ingredient: {
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
                        },
                        uuid: 5678
                    },
                    {
                        ingredient: {
                            "_id":"60666c42cc7b410027a1a9b7",
                            "name":"Соус Spicy-X",
                            "type":"sauce",
                            "proteins":30,
                            "fat":20,
                            "carbohydrates":40,
                            "calories":30,
                            "price":90,
                            "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
                            "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                            "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
                            "__v":0
                        },
                        uuid: 1234
                    }
                ],
                totalCost: 170,
            })
    })


    it("Should handle CLEAR_CONSTRUCTOR", () => {
        const currentState = {
            selectedBun: {
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
            items: [
                {
                    ingredient: {
                        "_id":"60666c42cc7b410027a1a9b7",
                        "name":"Соус Spicy-X",
                        "type":"sauce",
                        "proteins":30,
                        "fat":20,
                        "carbohydrates":40,
                        "calories":30,
                        "price":90,
                        "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
                        "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                        "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
                        "__v":0
                    },
                    uuid: 1234
                }
            ],
            totalCost: 2600,
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
