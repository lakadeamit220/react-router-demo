import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../store/UserContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, setIsLoggedIn } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true); // Token found, user is logged in
    } else {
      setIsLoggedIn(false); // No token found, user is logged out
    }

    setLoading(false); // Finished checking
  }, [setIsLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
