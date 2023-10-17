import React, { useEffect, useState } from "react";
import { Button, Input } from "./components";
import { login, logout } from "./services/services";
import { User } from "./types";
import "./App.css";

function App() {
  const isUser = sessionStorage.getItem("is-authenticated") === "true";
  const isSavedUser = localStorage.getItem("user_email");

  const [saved, setSaved] = useState(!!isSavedUser);
  const [user, setUser] = useState<User>({
    email: "",
    isAuth: false,
    error: "",
  });

  useEffect(() => {
    setUser({
      email: isSavedUser ? isSavedUser : "",
      isAuth: isUser,
      error: "",
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
          <Button className="logout" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="login-container">
          <p className="login-title">SIGN IN TO YOUR ACCOUNT</p>
          <form onSubmit={(e) => handleLogin(e)} className="login-form">
            <Input
              type="email"
              id="email"
              value={user.email}
              placeholder="Username"
              onChange={(e) =>
                setUser({ ...user, email: e.target.value, error: "" })
              }
              error={user.error}
              errorMsg="Invalid email address!"
            />
            <Input
              type="password"
              id="password"
              placeholder="Password"
              onChange={() => setUser({ ...user, error: "" })}
              error={user.error}
              errorMsg="Invalid password!"
            />
            <Input
              type="checkbox"
              id="remember"
              checked={saved}
              onChange={() => setSaved(!saved)}
              label="Remember me"
              labelPosition="after"
            />
            <Button className="login" type="submit">
              Login Now
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
