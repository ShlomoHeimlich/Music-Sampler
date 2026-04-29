import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/authPage.css";

export default function AuthPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage("");
    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    const data = await res.json();
    if (data.message === "Login success") {
      setMessage("Login successful");
      setTimeout(() => navigate("/home"), 600);
    } else {
      setMessage(data.error);
      setMode("register");
    }
  };

  const handleRegister = async () => {
    setMessage("");
    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });
    const data = await res.json();
    if (data.message === "User created") {
      setMessage("Registration successful You can now login");
      setName("");
      setPassword("");
      setMode("login");
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => setMode("register")}
          >
            Register
          </button>
        </div>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={mode === "login" ? handleLogin : handleRegister}>
          {mode}
        </button>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}