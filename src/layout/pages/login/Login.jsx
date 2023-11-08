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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthData, setLoading } from "../../../redux/reducers/auth";
import { auth } from "../../../../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { notify } from "../../../utility/notify";

const Login = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSignIn = async (data) => {
    dispatch(setLoading(true));

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = {
        name: userCredential?.user?.displayName,
        email: userCredential?.user?.email,
      };

      if (userCredential?.user?.email) {
        dispatch(setAuthData(user));
        dispatch(setLoading(false));
        notify("Successfully Log In", "success");

        navigate(from, { replace: true });
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
              Log In
            </Typography>
            <form onSubmit={handleSubmit(handleSignIn)} autoComplete="off">
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
                    })}
                    fullWidth
                    error={errors.password ? true : false}
                    helperText={errors.password?.message}
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
                Log In
              </Button>
            </form>
            <Box sx={{ marginTop: "10px" }}>
              <span>Don't have an account?</span>
              <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
                <Link to="/register">Register</Link>
              </span>
            </Box>
          </Grid>
        </Grow>
      </Grid>
    </Box>
  );
};

export default Login;
