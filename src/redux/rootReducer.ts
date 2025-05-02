"use client";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// slices
import dashboardReducer from "./slices/dashboard";
import projectReducer from "./slices/project";
import partReducer from "./slices/part";
import notificationReducer from "./slices/notification";
import settingsReducer from "./slices/setting";

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const productPersistConfig = {
  key: "product",
  storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  project: projectReducer,
  partData: partReducer,
  notification: notificationReducer,
  settings: settingsReducer,
});

export { rootPersistConfig, rootReducer };
