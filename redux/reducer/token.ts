import { createSlice } from "@reduxjs/toolkit";

type State = {
  tokenAvailable: number;
  showMenu: boolean;
};

const initialValue: State = {
  tokenAvailable: 3,
  showMenu: false,
};

const tokenReducer = createSlice({
  initialState: initialValue,
  name: "showMenu",
  reducers: {
    TOGGLE: (state) => {
      state.showMenu = !state.showMenu;

      return state;
    },
    UPDATE_TOKEN: (state, action) => {
      state.tokenAvailable = action.payload;

      return state;
    },
  },
});

export const { TOGGLE, UPDATE_TOKEN } = tokenReducer.actions;
export default tokenReducer.reducer;
