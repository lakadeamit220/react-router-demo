import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/UserContext";

function Logout() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call logout from context
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
