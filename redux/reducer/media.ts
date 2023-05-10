import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Data = {
  download_url: string;
  preview: string;
  type: string;
};

interface State {
  data: Data[];
}

const initialState: State = {
  data: [],
};

export const counterSlice = createSlice({
  name: "mediaData",
  initialState,
  reducers: {
    init: (state, action: PayloadAction<Data[]>) => {
      state.data = action.payload;

      return state;
    },
  },
});

export const { init } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer;
