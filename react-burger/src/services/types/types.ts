import { ReactNode } from "react";

export type TIngredient = {
        calories : number,
        carbohydrates : number,
        fat : number,
        image : string,
        image_large : string,
        image_mobile : string,
        name : string,
        price : number,
        proteins : number,
        type : string,
        __v : number,
        _id : string
};

export type TIngredientWithUUID = {
        uuid?: number, 
        ingredient: TIngredient
};

export type TModal = {
        onClose : () => void,
        title? : string,
        children? : ReactNode,
};