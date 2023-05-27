export function selectAllIngredients(store) {
    return store.burgerIngredients;
}

export function selectAllIngredientsItems(store) {
    return store.burgerIngredients.items;
}

export function selectBurgerConstructorItems(store) {
    return store.burgerConstructor.items;
}

export function selectSelectedBun(store) {
    return store.burgerConstructor.selectedBun;
}

export function selectConstructorTotalCost(store) {
    return store.burgerConstructor.totalCost;
}

export function selectOrderNum(store) {
    return store.orderDetails.orderNum;
}

export function selectIngredientDetails(store) {
    return store.ingredientDetails;
}

