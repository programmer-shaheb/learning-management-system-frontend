import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourse } from "../../../redux/actions/courses";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Grow,
  Toolbar,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useAuth from "../../../hooks/useAuth";
import { updateCourse } from "../../../courseAPI";
import Collapsible from "react-collapsible";
import { v4 as uuidv4 } from "uuid";
import { notify } from "../../../utility/notify";

const CourseDetails = () => {
  const [isEnroll, setIsEnroll] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { course, isLoading, isError, error } = useSelector(
    (state) => state.courses
  );
  const dispatch = useDispatch();

  const isEmailExist = course?.students?.some(
    (student) => student.email === currentUser?.email
  );

  useEffect(() => {
    dispatch(fetchCourse(courseId));
  }, [dispatch, courseId]);

  const handleEnroll = async () => {
    if (!currentUser) navigate("/login");
    const newStudent = await updateCourse(course.courseId, {
      id: uuidv4(),
      name: currentUser?.displayName,
      email: currentUser?.email,
    });
    setIsEnroll(newStudent.acknowledged);
    if (newStudent.acknowledged) {
      notify("Successfully Enrolled", "success");
      navigate("/dashboard");
    }
  };

  return (
    <Grow in timeout={1000}>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <img src={course?.thumbnail} alt="course" />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography
              variant="h4"
              style={{ fontWeight: "bold", marginBottom: "8px" }}
            >
              {course.courseName}
              <Chip
                sx={{ marginLeft: "10px" }}
                label={course?.enrollmentStatus}
                color="success"
                variant="outlined"
              />
            </Typography>
            <Typography
              variant="subtitle1"
              style={{ color: "#757575", marginBottom: "16px" }}
            >
              Instructor : {course?.instructor}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {course?.duration} | {course?.schedule} | {course?.location}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ marginTop: "16px" }}
            >
              {course?.description}
            </Typography>
            <Button
              disableElevation
              variant="contained"
              style={{
                marginRight: "16px",
                marginTop: "16px",
                background: "#4e54c8",
                color: "#fff",
              }}
              disabled={isEmailExist}
              onClick={handleEnroll}
            >
              {isEmailExist ? "Already Enrolled" : "Enroll Now"}
            </Button>
          </Grid>
        </Grid>
        <Divider style={{ margin: "16px 0" }} />
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", marginBottom: "8px" }}
        >
          What you'll learn <ExpandMoreIcon />
        </Typography>
        <Typography
          variant="h6"
          sx={{
            padding: "0 8px",
            margin: "10px 0",
          }}
        >
          {course?.syllabus?.map((list, index) => (
            <Collapsible key={index} trigger={list.topic}>
              <Box
                sx={{
                  background: "#eeeeee",
                  padding: "0 8px",
                  margin: "10px 0",
                }}
              >
                {list.content}
              </Box>
            </Collapsible>
          ))}
        </Typography>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", marginBottom: "8px" }}
        >
          Requirements
        </Typography>
        <Typography variant="body1" gutterBottom>
          {course?.prerequisites?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </Typography>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", marginBottom: "8px" }}
        >
          Description
        </Typography>
        <Typography variant="body1" gutterBottom>
          {course?.description}
        </Typography>
      </Box>
    </Grow>
  );
};

export default CourseDetails;
