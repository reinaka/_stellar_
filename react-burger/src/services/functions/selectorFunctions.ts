import { TStore } from "../store";
import { TOrder } from "../types/types";
import { TIngredientWithUUID } from "../types/types";
import { TIngredient } from "../types/types";

export function selectAllIngredients(store : TStore) {
    return store.burgerIngredients;
}

export function selectAllIngredientsItems(store : TStore) : TIngredient[] {
    return store.burgerIngredients.items;
}

export function selectBurgerConstructorItems(store : TStore) : TIngredientWithUUID[] {
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

export function selectAuthChecked(store : TStore) : boolean {
    return store.authData.isAuthChecked;
}

export function selectAuthError(store : TStore) : string | null {
    return store.authData.authError;
}

export function selectOrders(store : TStore) : TOrder[] {
    return store.wsSocket.orders;
}

export function selectOrdersToday(store : TStore) : number {
    return store.wsSocket.totalToday;
}

export function selectOrdersTotal(store : TStore) : number {
    return store.wsSocket.total;
}

export function selectCurrentOrder(store : TStore) : TOrder {
    return store.currentOrderDetails;
}

export function selectWSConnectionSuccess(store : TStore) : boolean {
    return store.wsSocket.wsConnected;
}

