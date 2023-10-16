import React, { useEffect, useState } from "react";
import { login, logout } from "./services/services";
import { User } from "./types";
import "./App.css";

function App() {
  const isUser = sessionStorage.getItem("is-authenticated") === "true";
  const isSavedUser = localStorage.getItem("user_email");

  const [saved, setSaved] = useState(!!isSavedUser);
  const [user, setUser] = useState<User>({
    email: "",
    isAuth: null,
    error: false,
  });

  useEffect(() => {
    setUser({
      email: isSavedUser ? isSavedUser : "",
      isAuth: isUser,
      error: false,
    });
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    const loginRes = await login(e, saved);
    setUser(loginRes);
  };

  const handleLogout = () => {
    const logoutRes = logout(isSavedUser);
    setUser(logoutRes);
  };

  return (
    <div className="container">
      {user.isAuth ? (
        <div className="auth-container">
          <p className="user-greet">Hi, {user.email}</p>
          <button className="logout button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="login-container">
          <p className="login-title">SIGN IN TO YOUR ACCOUNT</p>
          <form onSubmit={(e) => handleLogin(e)} className="login-form">
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Username"
              className="input"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className={`input ${user.error && "error"}`}
              onChange={() => setUser({ ...user, error: false })}
            />
            {user.error && (
              <p className="error-msg">
                Password must be at least 6 characters long and to contain at
                least 1 digit
              </p>
            )}
            <div className="input-checkbox">
              <input
                type="checkbox"
                id="remember"
                checked={saved}
                onChange={() => setSaved(!saved)}
                className="input"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button className="login button" type="submit">
              Login Now
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
