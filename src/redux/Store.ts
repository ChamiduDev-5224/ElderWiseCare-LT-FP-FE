import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth_slice"; // Import the reducer, not the slice

export const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Optionally, define RootState and AppDispatch for use throughout your app
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
