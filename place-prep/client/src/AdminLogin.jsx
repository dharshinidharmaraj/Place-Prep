
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./api";
import "./AdminLogin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store logged-in admin information
        localStorage.setItem("admin", JSON.stringify(data));

        // Navigate to Admin Dashboard
        navigate("/admin-dashboard");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Admin login error:", error);
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h1>Admin Login</h1>

        <form onSubmit={handleLogin}>

          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit">
            Login
          </button>

        </form>

        {message && (
          <p className="admin-login-message">{message}</p>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;

