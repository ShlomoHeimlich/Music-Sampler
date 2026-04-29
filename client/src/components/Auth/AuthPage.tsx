import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/AuthPage.css";

export default function AuthPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"Login" | "Register">("Login");
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
      setMessage("Login failed. Try registering.");
      setMode("Register");
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
      setMode("Login");
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-tabs">
          <button
            className={mode === "Login" ? "active" : ""}
            onClick={() => setMode("Login")}
          >
            Login
          </button>
          <button
            className={mode === "Register" ? "active" : ""}
            onClick={() => setMode("Register")}
          >
            Register
          </button>
        </div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={mode === "Login" ? handleLogin : handleRegister}>
          {mode}
        </button>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}