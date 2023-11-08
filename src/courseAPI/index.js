import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create({
  baseURL: "https://learning-management-system-server.vercel.app",
});

export const getAllCourses = async () => {
  const response = await API.get("/api/courses");

  return response.data;
};

export const getCourse = async (courseId) => {
  const response = await API.get(`/api/courses/${courseId}`);

  return response.data;
};

export const updateCourse = async (courseId, newStudent) => {
  const response = await API.patch(
    `/api/update-course/${courseId}`,
    newStudent
  );

  return response.data;
};

export const myCourse = async (email) => {
  const response = await API.post(`/api/myCourses`, { email });

  return response.data;
};
