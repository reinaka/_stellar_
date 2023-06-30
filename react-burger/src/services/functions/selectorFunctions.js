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

export function selectUserName(store) {
    return store.authData.userData.user.name;
}

export function selectUserEmail(store) {
    return store.authData.userData.user.email;
}

export function selectUserPassword(store) {
    return store.authData.userData.user.password
    ? store.authData.userData.user.password 
    : ""
}

export function selectLoginSuccess(store) {
    return store.authData.userData.success;
}

export function selectAuthChecked(store) {
    return store.authData.isAuthChecked;
}

export function selectAuthError(store) {
    return store.authData.authError;
}

