import { rootReducer } from './reducers/root-reducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})