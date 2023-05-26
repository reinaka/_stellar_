export const ADD_INGREDIENT_CONSTRUCTOR = 'ADD_INGREDIENT_CONSTRUCTOR';
export const DELETE_INGREDIENT_CONSTRUCTOR = 'DELETE_INGREDIENT_CONSTRUCTOR';
export const ADD_BUN_CONSTRUCTOR = 'ADD_BUN_CONSTRUCTOR';
export const REORDER_INGREDIENTS_CONSTRUCTOR = 'REORDER_INGREDIENTS_CONSTRUCTOR';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addToConstructor = (item, uuid) => {
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

export const deleteFromConstructor = (arr, uuid, price) => {
    const resultArr = arr.filter(item => item.uuid !== uuid);
    return({
        type: DELETE_INGREDIENT_CONSTRUCTOR,
        payload: resultArr,
        price: price,
    })
}