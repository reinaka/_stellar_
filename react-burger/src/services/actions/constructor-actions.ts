import { TIngredientWithUUID, TIngredient } from "../types/types";

export const ADD_INGREDIENT_CONSTRUCTOR : 'ADD_INGREDIENT_CONSTRUCTOR' = 'ADD_INGREDIENT_CONSTRUCTOR';
export const DELETE_INGREDIENT_CONSTRUCTOR : 'DELETE_INGREDIENT_CONSTRUCTOR' = 'DELETE_INGREDIENT_CONSTRUCTOR';
export const ADD_BUN_CONSTRUCTOR : 'ADD_BUN_CONSTRUCTOR' = 'ADD_BUN_CONSTRUCTOR';
export const REORDER_INGREDIENTS_CONSTRUCTOR : 'REORDER_INGREDIENTS_CONSTRUCTOR' = 'REORDER_INGREDIENTS_CONSTRUCTOR';
export const CLEAR_CONSTRUCTOR : 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

export interface IAddIngredientToConstructorAction {
    readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR,
    readonly payload: TIngredient,
    readonly uuid: string
}

export interface IAddBunToConstructorAction {
    readonly type: typeof ADD_BUN_CONSTRUCTOR,
    readonly payload: TIngredient
}

export interface IDeleteFromConstructor {
    readonly type: typeof DELETE_INGREDIENT_CONSTRUCTOR,
    readonly payload: TIngredientWithUUID[],
    readonly price: number,
}

export interface IReorderConstructor {
    readonly type : typeof REORDER_INGREDIENTS_CONSTRUCTOR,
    readonly uuid : string,
    readonly index : number
}

export interface IClearConstructor {
    readonly type : typeof CLEAR_CONSTRUCTOR
}

export type TConstructorActions = 
IAddIngredientToConstructorAction 
| IAddBunToConstructorAction 
| IDeleteFromConstructor 
| IReorderConstructor
| IClearConstructor;

export const addToConstructor = (item : TIngredient, uuid? : string) => {
    return uuid
    ? ({
        type: ADD_INGREDIENT_CONSTRUCTOR,
        payload: item,
        uuid: uuid
        })
    : ({
        type: ADD_BUN_CONSTRUCTOR,
        payload: item,
        });
}

export const deleteFromConstructor = (arr : TIngredientWithUUID[], uuid : string, price : number) => {
    const resultArr = arr.filter(item => item.uuid !== uuid);
    return({
        type: DELETE_INGREDIENT_CONSTRUCTOR,
        payload: resultArr,
        price: price,
    })
}