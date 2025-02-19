import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Sending registration data to the backend
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });

      // On successful registration
      setSuccessMessage(response.data.message);
      setErrorMessage(""); // Clear error message if success
      setTimeout(() => {
        navigate("/login"); // Redirect user to login after registration
      }, 2000);
    } catch (error) {
      // If registration fails, show error
      setErrorMessage(error.response?.data.message || "An error occurred");
      setSuccessMessage(""); // Clear success message if error occurs
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
}

export default Register;
