import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import "./Login.css";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("https://sample-e-1.onrender.com/login", {
        email,
        password,
      });

      setStatusType("success");
      setStatusMessage("Login successful. Redirecting...");

      const token = response.data?.token || response.data?.accessToken || response.data?.jwt;
      if (token) {
        localStorage.setItem("token", token);
      }

      console.log("Login Data:", response.data);

      await delay(3000);

      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);

      const errorMessage = err.response?.data?.message || "Invalid email or password. Please try again.";
      setStatusType("error");
      setStatusMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {isLoading ? (
        <div className="auth-loader-overlay" aria-live="polite" aria-busy="true">
          <div className="auth-loader-card">
            <MoonLoader size={44} color="#2563eb" />
            <p>Logging in...</p>
          </div>
        </div>
      ) : null}

      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        {statusMessage ? <p className={`auth-status auth-status-${statusType}`}>{statusMessage}</p> : null}

        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          Login
        </button>

        <p>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
