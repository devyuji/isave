import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DataProps {
  preview: string;
  downloadLink: string;
  isDownloading: boolean;
  username: string;
  type: string;
}

const initialState: DataProps[] = [];

const postDataReducer = createSlice({
  name: "postData",
  initialState,
  reducers: {
    SET_DATA: (state, action: PayloadAction<DataProps[]>) =>
      (state = action.payload),

    IS_DOWNLOADING: (
      state,
      action: PayloadAction<{ index: number; isDownloading: boolean }>
    ) => {
      state[action.payload.index].isDownloading = action.payload.isDownloading;
      return state;
    },
    RESET: (state) => (state = initialState),
  },
});

export const { SET_DATA, IS_DOWNLOADING, RESET } = postDataReducer.actions;
export default postDataReducer.reducer;
