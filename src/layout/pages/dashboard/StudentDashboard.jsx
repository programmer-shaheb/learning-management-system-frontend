import { Box, Grid, Grow, Toolbar, Typography } from "@mui/material";
import useCourseFinder from "../../../hooks/useCourseFinder";
import useAuth from "../../../hooks/useAuth";
import Progress from "../../../utility/Progress";

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const { courseFound, studentCourse } = useCourseFinder(currentUser?.email);

  if (studentCourse?.length < 1) {
    return (
      <Box sx={{ textAlign: "center", mt: "10px" }}>
        <Toolbar />
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Oops! You don't have any enrolled courses yet.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Explore our courses and start your learning journey today!
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ p: { xs: "3px", sm: "5px", md: "10px" } }}>
      <Toolbar />
      <Grow in timeout={1000}>
        <Typography variant="h4" align="center" fontWeight="bold">
          My Courses
        </Typography>
      </Grow>
      <Grid container sx={{ mt: "10px" }}>
        {studentCourse?.map((course) => (
          <Grow key={course?.courseId} in timeout={1000}>
            <Grid item xs={12} sm={12} md={10}>
              <Box
                sx={{
                  width: "100%",
                  border: "1px solid #e9ecef",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Box
                  sx={{
                    flex: "0 0 240px",
                    marginRight: { xs: "0", sm: "24px" },
                    position: "relative",
                    width: "100%",
                    height: { xs: "auto", sm: "240px" },
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={course?.thumbnail}
                    alt=""
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "12px",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: "8px",
                        textDecoration: "none",
                        color: "#4e54c8",
                      }}
                    >
                      {course?.courseName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "#757575",
                        fontWeight: "bold",
                        marginBottom: "16px",
                      }}
                    >
                      Instructor : {course?.instructor}
                    </Typography>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        Progress {<Progress />}
                      </Typography>
                    </Box>
                    <Typography variant="body1" gutterBottom>
                      {course?.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grow>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
