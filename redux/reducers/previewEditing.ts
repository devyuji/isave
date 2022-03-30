import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const previewEdit = createSlice({
  name: "previewEdit",
  initialState,
  reducers: {
    TOGGLE: (state) => (state = !state),
  },
});

export const { TOGGLE } = previewEdit.actions;
export default previewEdit.reducer;
