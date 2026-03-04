import { configureStore } from "@reduxjs/toolkit";
import { adminApi } from "./api/adminApi";
import { userApi } from "./api/userApi";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminApi.middleware)
      .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
