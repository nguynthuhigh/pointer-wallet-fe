import { configureStore, createReducer } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
// const rootReducer = createReducer({
//   auth: authReducer,
//   ...
// });
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// })
// export let persistor = persistStore(store)

export const store = configureStore({
  reducer: { auth: authReducer },
});
export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
