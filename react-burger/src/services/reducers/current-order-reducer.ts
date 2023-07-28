import { ADD_CURRENT_ORDER_DETAILS, DELETE_CURRENT_ORDER_DETAILS} from '../actions/current-order-actions';
import { TCurrentOrderActions } from '../actions/current-order-actions';

export const initialState = null;

export const currentOrderReducer = (state=initialState, action: TCurrentOrderActions) => {
    switch(action.type) {
        case ADD_CURRENT_ORDER_DETAILS: {
        return action.payload
        }
        case DELETE_CURRENT_ORDER_DETAILS: {
            return {}
        }
        default: {
            return state;
        }
    }
};