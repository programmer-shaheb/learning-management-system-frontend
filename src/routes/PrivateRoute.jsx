import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { isLoading } = useSelector((state) => state.authentication);
  const { currentUser } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <span>Loading....</span>;
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
