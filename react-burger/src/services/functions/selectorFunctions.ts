import { TStore } from "../store";

export function selectAllIngredients(store : TStore) {
    return store.burgerIngredients;
}

export function selectAllIngredientsItems(store : TStore) {
    return store.burgerIngredients.items;
}

export function selectBurgerConstructorItems(store : TStore) {
    return store.burgerConstructor.items;
}

export function selectSelectedBun(store : TStore) {
    return store.burgerConstructor.selectedBun;
}

export function selectConstructorTotalCost(store : TStore) {
    return store.burgerConstructor.totalCost;
}

export function selectOrderNum(store : TStore) {
    return store.orderDetails.orderNum;
}

export function selectIngredientDetails(store : TStore) {
    return store.ingredientDetails;
}

export function selectUserName(store : TStore) {
    return store.authData.userData.user.name;
}

export function selectUserEmail(store : TStore) {
    return store.authData.userData.user.email;
}

export function selectUserPassword(store : TStore) {
    return store.authData.userData.user?.password || ""
}

export function selectLoginSuccess(store : TStore) {
    return store.authData.userData.success;
}

export function selectAuthChecked(store : TStore) {
    return store.authData.isAuthChecked;
}

export function selectAuthError(store : TStore) {
    return store.authData.authError;
}

export function selectOrders(store : TStore) {
    return store.wsSocket.orders;
}

export function selectOrdersToday(store : TStore) {
    return store.wsSocket.totalToday;
}

export function selectOrdersTotal(store : TStore) {
    return store.wsSocket.total;
}

export function selectCurrentOrder(store : TStore) {
    return store.currentOrderDetails;
}

export function selectWSConnectionSuccess(store : TStore) {
    return store.wsSocket.wsConnected;
}

