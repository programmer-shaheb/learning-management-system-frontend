import { configureStore } from "@reduxjs/toolkit";
import coursesSlice from "../reducers/courses";
import authSlice from "../reducers/auth";

export const store = configureStore({
  reducer: {
    courses: coursesSlice,
    authentication: authSlice,
  },
});
