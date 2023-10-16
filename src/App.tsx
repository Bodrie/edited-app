import React from "react";
import "./App.css";
import { Input } from "./components";
import axios from "axios";

function App() {
  const handleLoginReq = () => {
    axios.post("/login", {
      email: "Fred",
      password: "Flintstone",
    });
  };

  return (
    <div className="App">
      <form>
        <Input type="email" />
        <Input type="password" />
        <Input type="checkbox" />
      </form>
      <button onClick={handleLoginReq}>Login</button>
    </div>
  );
}

export default App;
