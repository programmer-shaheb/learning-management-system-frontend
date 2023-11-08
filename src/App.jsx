import { Container } from "@mui/material";
import Navbar from "./layout/Shared/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};

export default App;
