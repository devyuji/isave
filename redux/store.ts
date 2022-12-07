import { configureStore } from "@reduxjs/toolkit";
import postData from "./reducers/postData";
import errorState from "./reducers/error";

export const store = configureStore({
  reducer: {
    POST_DATA: postData,
    ERROR_STATE: errorState,
  },
  devTools: process.env.NODE_ENV === "production" ? false : true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
