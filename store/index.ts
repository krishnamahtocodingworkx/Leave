import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import productReducer from "./productsSlice";
// import cartReducer from "./cartSlice";
import storage from "./storage";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import authReducer from "./auth/authSlice";
import { createLogger } from "redux-logger";


/**
 * Logger configuration (typed automatically)
 */
const logger = createLogger({
    collapsed: true,
    duration: true,
    diff: true,
});
const rootReducer = combineReducers({
    auth: authReducer,
})

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        process.env.NODE_ENV === "development" ?
            getDefaultMiddleware({
                serializableCheck: false,
            }).concat(logger) : getDefaultMiddleware({
                serializableCheck: false,
            }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
