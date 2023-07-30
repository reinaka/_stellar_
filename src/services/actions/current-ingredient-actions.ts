import { TIngredient } from "../types/types";

export const ADD_INGREDIENT_DETAILS : 'ADD_INGREDIENT_DETAILS' = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS : 'DELETE_INGREDIENT_DETAILS' = 'DELETE_INGREDIENT_DETAILS';

export interface IAddCurrentIngredientDetails {
    readonly type : typeof ADD_INGREDIENT_DETAILS,
    readonly payload : TIngredient
}

export interface IDeleteCurrentIngredientDetails {
    readonly type : typeof DELETE_INGREDIENT_DETAILS
}

export type TCurrentIngredientDetailsActions = IAddCurrentIngredientDetails | IDeleteCurrentIngredientDetails;