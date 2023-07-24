import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TAllActions } from './actionTypes';

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions = TAllActions;
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>; 
export type AppDispatch = typeof store.dispatch; 