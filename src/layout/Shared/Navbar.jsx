import { removeAuthData, setLoading } from "../../redux/reducers/auth";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import useAuth from "../../hooks/useAuth";
import { notify } from "../../utility/notify";

const drawerWidth = 240;
const navItemsLoggedIn = ["Courses", "Student Dashboard", "Log Out"];
const navItemsLoggedOut = ["Courses", "Sign In", "Register"];

const Navbar = (props) => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogOut = () => {
    dispatch(setLoading(true));
    dispatch(removeAuthData());
    signOut(auth);
    notify("Successfully Log Out", "success");

    navigate("/");
  };

  const handleNavItemClick = (item) => {
    switch (item) {
      case "Courses":
        navigate("/");

        break;
      case "Student Dashboard":
        navigate("/dashboard");

        break;
      case "Sign In":
        navigate("/login");

        break;
      case "Register":
        navigate("/register");

        break;
      case "Log Out":
        if (currentUser) {
          handleLogOut();
        }
        break;
      default:
    }
    handleDrawerToggle();
  };

  let navItemsToDisplay = [];

  if (currentUser) {
    navItemsToDisplay = navItemsLoggedIn;
  } else {
    navItemsToDisplay = navItemsLoggedOut;
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MENTORING
      </Typography>
      <Divider />
      <List>
        {navItemsToDisplay.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                handleNavItemClick(item);
                handleDrawerToggle();
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline />
      <Grow in timeout={1000}>
        <AppBar
          component="nav"
          elevation={0}
          sx={{
            background: " #4e54c8",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              sx={{
                display: { xs: "block", sm: "block" },
                color: "#ffffff",
              }}
            >
              <Link to={"/"}>
                <img
                  src="https://mentoring-react.dreamstechnologies.com/assets/images/logo.png"
                  alt=""
                />
              </Link>
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" }, ml: "100px" }}>
              {navItemsToDisplay.map((item) => (
                <Button
                  key={item}
                  sx={{ color: "#ffffff", mx: "10px", fontWeight: "bold" }}
                  onClick={() => handleNavItemClick(item)}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Grow>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
