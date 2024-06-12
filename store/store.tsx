import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./slices/authSlice";
import eventSlice from "./slices/eventSlice";
import orderSlice from "./slices/orderSlice";

const reducers = combineReducers({
  auth: authSlice,
  events: eventSlice,
  orders: orderSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

export type RootState = ReturnType<typeof reducers>;

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;