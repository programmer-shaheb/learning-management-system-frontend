import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Toolbar,
  Grid,
  Grow,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData, setLoading } from "../../../redux/reducers/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../../firebase.config";
import { notify } from "../../../utility/notify";

const Register = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const navigate = useNavigate();

  const { authData, isLoading } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const handleRegister = async (data) => {
    dispatch(setLoading(true));

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const updateUser = await updateProfile(auth.currentUser, {
        displayName: data?.name,
      });

      const user = {
        name: userCredential?.user?.displayName,
        email: userCredential?.user?.email,
      };

      if (userCredential?.user?.email) {
        dispatch(setAuthData(user));
        dispatch(setLoading(false));
        notify("Successfully Registered", "success");
        navigate("/");
      }
    } catch (error) {
      dispatch(setLoading(false));
      notify("Something went wrong", "error");
      console.log(error);
    }
  };

  return (
    <Box component="main" sx={{ p: 3 }}>
      <Toolbar />
      <Grid
        container
        sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}
      >
        <Grow in timeout={1000}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h4" align="center" fontWeight="bold">
              Register
            </Typography>
            <form onSubmit={handleSubmit(handleRegister)} autoComplete="off">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    {...register("name", { required: true })}
                    fullWidth
                    error={errors.name ? true : false}
                    helperText={errors.name && "Name is required"}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    {...register("email", { required: true })}
                    fullWidth
                    error={errors.email ? true : false}
                    helperText={errors.email && "Email is required"}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Password must be less than 20 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                        message:
                          "Password must have one uppercase, one lowercase, one number, and one special character.",
                      },
                    })}
                    fullWidth
                    error={errors.password ? true : false}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    {...register("confirmPassword", {
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                    fullWidth
                    error={errors.confirmPassword ? true : false}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disableElevation
                style={{ background: " #4e54c8", fontWeight: "bold" }}
              >
                Sign Up
              </Button>
            </form>

            <Box sx={{ marginTop: "10px" }}>
              <span>Already have an account?</span>
              <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
                <Link to="/login">Login</Link>
              </span>
            </Box>
          </Grid>
        </Grow>
      </Grid>
    </Box>
  );
};

export default Register;
