import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../redux/actions/courses";
import Course from "./Course";
import { CircularProgress, Grow, TextField, Typography } from "@mui/material";

const Courses = () => {
  const { courses, isLoading, isError, error } = useSelector(
    (state) => state.courses
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCourses(courses.data || []);
    } else {
      const filtered = (courses.data || []).filter(
        (course) =>
          course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm, courses.data]);

  return (
    <Box component="main" sx={{ p: { xs: "3px", sm: "5px", md: "8px" } }}>
      <Toolbar />
      <Grow in timeout={1000}>
        <TextField
          label="Search Our Courses"
          variant="outlined"
          placeholder="Search..."
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grow>
      {isLoading && <CircularProgress />}
      {isError && <Typography variant="body1">{error}</Typography>}
      {!isLoading &&
        filteredCourses.map((course) => (
          <Course key={course.courseId} course={course} />
        ))}
    </Box>
  );
};

export default Courses;
