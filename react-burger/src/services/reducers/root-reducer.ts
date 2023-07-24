import { combineReducers } from 'redux';
import { allIngredientsReducer } from './all-ingredients-reducer';
import { constructorIngredientsReducer } from './constructor-ingredients-reducer';
import { currentIngredientReducer } from './current-ingredient-reducer';
import { orderReducer } from './order-reducer';
import { authReducer } from './auth-reducer';
import { socketReducer } from './socket-reducer';
import { currentOrderReducer } from './current-order-reducer';

export const rootReducer = combineReducers({
    burgerIngredients: allIngredientsReducer,
    burgerConstructor: constructorIngredientsReducer,
    orderDetails: orderReducer,
    ingredientDetails: currentIngredientReducer,
    authData: authReducer,
    wsSocket: socketReducer,
    currentOrderDetails: currentOrderReducer,
})