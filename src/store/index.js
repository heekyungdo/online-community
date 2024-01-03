import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
  persistStore,
} from "redux-persist";
// import { postData } from "./postSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaulMiddleware) =>
    getDefaulMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
