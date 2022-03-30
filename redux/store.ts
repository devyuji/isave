import { configureStore } from "@reduxjs/toolkit";
import postData from "./reducers/postData";
import previewData from "./reducers/previewData";
import previewEditing from "./reducers/previewEditing";

export const store = configureStore({
  reducer: {
    POST_DATA: postData,
    PREVIEW_DATA: previewData,
    PREVIEW_EDITTING: previewEditing,
  },
  devTools: process.env.NODE_ENV === "production" ? false : true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
