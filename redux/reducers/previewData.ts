import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import update from "immutability-helper";

const initialState = {
  profile: {},
  posts: [],
};

export interface ProfilePostProps {
  image_url: string;
  type: string;
}

const previewDataReducer = createSlice({
  name: "previewData",
  initialState,
  reducers: {
    SET_DATA: (state, action) => (state = action.payload),
    REMOVE: (state, action: PayloadAction<number>) => {
      state.posts.splice(action.payload, 1);
      return state;
    },
    ADD: (state, action) => {
      state.posts = update(state.posts, { $unshift: [action.payload] as any });

      return state;
    },
    UPDATE_PROFILE: (state, action) => {
      (state.profile as any).image_url = action.payload;
      return state;
    },
    UPDATA_POST: (state, action) => {
      state.posts = action.payload;
      return state;
    },
    RESET: (state) => (state = initialState),
  },
});

export const { SET_DATA, REMOVE, RESET, ADD, UPDATE_PROFILE, UPDATA_POST } =
  previewDataReducer.actions;
export default previewDataReducer.reducer;
