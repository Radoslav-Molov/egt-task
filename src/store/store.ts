import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../store/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
