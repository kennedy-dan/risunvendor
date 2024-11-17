import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/slice/authSlice";

import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import  dashboardSlice  from "./slice/dashboardSlice";


const createNoopStorage = () => {
	return {
		getItem(_key) {
			return Promise.resolve(null);
		},
		setItem(_key, value) {
			
			return Promise.resolve(value);
		},
		removeItem(_key) {
			return Promise.resolve();
		},
	};
};

const storage =
	typeof window !== "undefined"
		? createWebStorage("local")
		: createNoopStorage();


const persistConfig = {
	key: "myartstockvendor",
	storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);
const rootReducer = combineReducers({
	auth: persistedReducer,
	dashboard: dashboardSlice

});
const loggingMiddleware = store => next => action => {
    // Execute the action
    let result = next(action);

    // Log the state after the action is executed
    // console.log('State before persisting:', store.getState());

    // Return the result of the action
    return result;
};

export const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: [thunk, loggingMiddleware], // Add the logging middleware here
});

export const persistor = persistStore(store);
