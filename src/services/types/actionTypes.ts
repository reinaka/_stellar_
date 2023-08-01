import { TIngredientsActions } from "../actions/all-ingredients-actions";
import { TAuthActions } from "../actions/auth-actions";
import { TConstructorActions } from "../actions/constructor-actions";
import { TOrderActions } from "../actions/order-details-actions";
import { TSocketActions } from "../actions/socket-actions";

export type TAllActions = TIngredientsActions | TAuthActions | TConstructorActions | TOrderActions | TSocketActions;
