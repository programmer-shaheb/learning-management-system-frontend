import { Grid, Box, Typography, Rating, Chip, Grow } from "@mui/material";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Grid container>
      <Grow in timeout={1000}>
        <Grid item xs={12} sm={12} md={12}>
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
              component={Link}
              to={`/courses/${course?.courseId}`}
            >
              <img
                src={course?.thumbnail}
                alt=""
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
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
                  component={Link}
                  to={`/courses/${course?.courseId}`}
                >
                  {course.courseName}{" "}
                  <Chip
                    sx={{ marginLeft: "10px" }}
                    label={course?.enrollmentStatus}
                    color="success"
                    variant="outlined"
                  />
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
                  <Rating
                    name="rating"
                    value={4.5}
                    precision={0.5}
                    readOnly
                    sx={{ marginRight: "8px" }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    4.5 | {course?.students?.length} students enrolled
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
    </Grid>
  );
};

export default Course;
