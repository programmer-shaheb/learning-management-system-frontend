import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Courses from "../layout/pages/home/Courses";
import CourseDetails from "../layout/pages/details/CourseDetails";
import Register from "../layout/pages/register/Register";
import Login from "../layout/pages/login/Login";
import StudentDashboard from "../layout/pages/dashboard/StudentDashboard";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Courses />,
      },
      {
        path: "/courses/:courseId",
        element: <CourseDetails />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <StudentDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "*",
    element: <div>Error Page</div>,
  },
]);
