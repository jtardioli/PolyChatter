import { useState } from "react";
const axios = require("axios").default;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    const newUser = { email, password };
    const req = newUser;
    axios
      .post("http://localhost:5000/api/login", req, { withCredentials: true })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
          />
        </label>

        <label>
          Password:
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
        </label>
      </form>
      <button onClick={loginUser}>Login</button>
    </div>
  );
};

export default LoginPage;
