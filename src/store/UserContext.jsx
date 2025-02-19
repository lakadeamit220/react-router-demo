import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      // Notify the server about logout (if your server supports this endpoint)
      await axios.post(
        "http://localhost:5000/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Clear the token from localStorage
      localStorage.removeItem("token");

      // Update the state
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, user, login, logout, setIsLoggedIn, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
