import { rootReducer } from './reducers/root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socketMiddleware';
import { socketActions } from './actions/socket-actions';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(socketMiddleware(socketActions)),
    devTools: process.env.NODE_ENV !== 'production',
});

export type TStore = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;