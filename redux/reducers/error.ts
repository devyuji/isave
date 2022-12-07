import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type DataProps = {
  isError: boolean;
};

const initialState: DataProps = {
  isError: false,
};

const errorState = createSlice({
  name: "errorState",
  initialState,
  reducers: {
    TOGGLE: (state, action) => {
      state.isError = !state.isError;
      return state;
    },
  },
});

export const { TOGGLE } = errorState.actions;
export default errorState.reducer;
