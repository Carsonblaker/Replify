import { useState } from "react";
import { Link } from "react-router-dom";
import "../auth.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const API = import.meta.env.VITE_API_URL;

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
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Wrong email or password");
        return;
      }

      localStorage.setItem("token", data.token);
      setMessage("Logged in! Loading your workouts...");
      setTimeout(() => (window.location.href = "/"), 1200);
    } catch (err) {
      setMessage("Server connection failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>

        <form onSubmit={handleSubmit}>
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
            Log In
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-link">
          Need an account?{" "}
          <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}