import { useState } from "react";
import { Link } from "react-router-dom";
import "../auth.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Signup failed");
        return;
      }
						if (data.token) {
      localStorage.setItem("token", data.token);
      setMessage("Account created! Redirecting...");
      setTimeout(() => (window.location.href = "/"), 1200);
						}else {
							setMessage("SignupFailed: Token Missing from reponse");
						}

    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            className="auth-input"
            placeholder="Name"
            value={form.username}
            onChange={handleChange}
          />

          <input
            name="email"
            className="auth-input"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            className="auth-input"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button className="auth-btn" type="submit">
            Sign Up
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}