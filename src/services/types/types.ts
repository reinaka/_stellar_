import { ReactNode } from "react";

export type TIngredient = {
        calories : string,
        carbohydrates : string,
        fat : string,
        image : string,
        image_large : string,
        image_mobile : string,
        name : string,
        price : number,
        proteins : string,
        type : string,
        __v : number,
        _id : string
};

export type TIngredientWithUUID = {
        uuid?: string, 
        ingredient: TIngredient
};

export type TModal = {
        onClose : () => void,
        title? : string,
        children? : ReactNode,
};

export type TOrder = {
        createdAt : string,
        ingredients : string[],
        name : string,
        number : number,
        status : 'done' | 'created' | 'pending',
        updatedAt : string,
        _id : string
};

