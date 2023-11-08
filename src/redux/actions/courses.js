import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCourses, getCourse } from "../../courseAPI";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const courses = await getAllCourses();
    return courses;
  }
);

export const fetchCourse = createAsyncThunk(
  "courses/fetchCourse",
  async (courseId) => {
    const course = await getCourse(courseId);
    return course;
  }
);
