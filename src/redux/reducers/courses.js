import { createSlice } from "@reduxjs/toolkit";
import { fetchCourse, fetchCourses } from "../actions/courses";

const initialState = {
  courses: [],
  course: {},
  courseType: "",
  isLoading: false,
  isError: false,
  error: "",
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    filterCourses: (state, action) => {
      state.courseType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.courses = [];
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(fetchCourse.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.course = action.payload;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export const { filterCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
