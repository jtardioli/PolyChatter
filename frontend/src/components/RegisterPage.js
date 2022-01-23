import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/RegisterPage.scss"
const axios = require("axios").default;

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [countryName, setCountryName] = useState("");

  let navigate = useNavigate();

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

      const redirect = () => {
        navigate(`/all-profiles`);
      }
      redirect();
  };

  return (
    <div>
      <h1>Create new account.</h1>
      <form className="inpt">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Name"
            className="field"
          />

        <label>
          Username:
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            placeholder="Username"
            className="field"
          />
        </label>

        <label>
          Email:
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email"
            className="field"
          />
        </label>

        <label>
          Password:
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Password"
            className="field"
          />
        </label>

        <label>
          Country:
          <input
            onChange={(e) => setCountryName(e.target.value)}
            type="countryName"
            name="countryName"
            placeholder="Country"
            className="field"
          />
        </label>

        <label>
          Native Language:
          <input
            onChange={(e) => setNativeLanguage(e.target.value)}
            type="nativeLanguage"
            name="nativeLanguage"
            placeholder="Native Language"
            className="field"
          />
        </label>

        <label>
          Target Language:
          <input
            onChange={(e) => setTargetLanguage(e.target.value)}
            type="targetLanguage"
            name="targetLanguage"
            placeholder="Language Learning"
            className="field"
          />
        </label>

      </form>
      <button onClick={registerUser}>Register</button>
    </div>
  );
};

export default RegisterPage;
