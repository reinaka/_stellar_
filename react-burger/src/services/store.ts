import { rootReducer } from './reducers/root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socketMiddleware';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(socketMiddleware()),
    devTools: process.env.NODE_ENV !== 'production',
});

export type TStore = ReturnType<typeof store.getState>;