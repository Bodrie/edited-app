import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { User } from "./types";
import "./App.css";

function App() {
  const isUser = sessionStorage.getItem("is-authenticated") === "true";
  const isSaved = localStorage.getItem("user_email");

  const [user, setUser] = useState<User>({
    email: "",
    isAuth: null,
  });

  const [saved, setSaved] = useState(!!isSaved);

  const handleLoginReq = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email: string = e.currentTarget.email.value;
    const password: string = e.currentTarget.password.value;

    if (saved) {
      localStorage.setItem("user_email", email);
    } else {
      localStorage.removeItem("user_email");
    }

    axios
      .post("/login", {
        email,
        password,
      })
      .then(() => setUser({ email: email, isAuth: true }))
      .catch(() => console.log("Error"));
  };

  const handleLogout = () => {
    sessionStorage.setItem("is-authenticated", "false");
    setUser({
      email: isSaved ? isSaved : "",
      isAuth: false,
    });
  };

  useEffect(() => {
    setUser({ email: isSaved ? isSaved : "", isAuth: isUser });
  }, []);

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
          <form onSubmit={(e) => handleLoginReq(e)} className="login-form">
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
              className="input"
            />
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
