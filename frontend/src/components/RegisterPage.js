import { useState } from "react";
const axios = require("axios").default;

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = () => {
    console.log(name, username, email, password);
    const newUser = { name, username, email, password };
    const req = newUser;
    axios
      .post("http://localhost:5000/api/register", req)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form>
        <label>
          Name
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
          />
        </label>

        <label>
          Username:
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
          />
        </label>

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
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default RegisterPage;
