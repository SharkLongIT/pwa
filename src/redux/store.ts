import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '~/thunk/authSlice';
import appSlice from '~/thunk/appSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    app: appSlice,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false, // cần cho AsyncStorage
        }),
    devTools: __DEV__,
});

/**
 * TYPES
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
