import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../store/UserContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
