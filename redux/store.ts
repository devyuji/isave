import { configureStore } from "@reduxjs/toolkit";
import mediaReducer from "./reducer/media";
import tokenReducer from "./reducer/token";

export const store = configureStore({
  reducer: {
    media: mediaReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
