import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { User } from "./types";

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
    <div className="App">
      {user.isAuth ? (
        <>
          <p>Hi, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <form onSubmit={(e) => handleLoginReq(e)}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          <label htmlFor="remember">Remember me</label>
          <input
            type="checkbox"
            id="remember"
            checked={saved}
            onChange={() => setSaved(!saved)}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

export default App;
