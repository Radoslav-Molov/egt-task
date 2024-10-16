import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersResponse: undefined,
};

export const usersSlice = createSlice({
  name: "getUsers",
  initialState,
  reducers: {
    add: (state, action) => {
      state.usersResponse = action.payload;
    },
  },
});

export const { add } = usersSlice.actions;

export default usersSlice.reducer;
