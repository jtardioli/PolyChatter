import { useState } from "react";
const axios = require("axios").default;

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [countryName, setCountryName] = useState("");

  const registerUser = () => {
    console.log(name, username, email, password, countryName, targetLanguage, nativeLanguage);
    const newUser = { name, username, email, password, countryName, targetLanguage, nativeLanguage };
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

        <label>
          Country:
          <input
            onChange={(e) => setCountryName(e.target.value)}
            type="countryName"
            name="countryName"
          />
        </label>

        <label>
          Target Language:
          <input
            onChange={(e) => setTargetLanguage(e.target.value)}
            type="targetLanguage"
            name="targetLanguage"
          />
        </label>

        <label>
          Native Language:
          <input
            onChange={(e) => setNativeLanguage(e.target.value)}
            type="nativeLanguage"
            name="nativeLanguage"
          />
        </label>
      </form>
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default RegisterPage;
