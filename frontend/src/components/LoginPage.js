import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.scss";
const axios = require("axios").default;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");
  if (token) {
    window.history.pushState({}, undefined, "/");
  }

  let navigate = useNavigate();

  const loginUser = () => {
    const newUser = { email, password };
    const req = newUser;
    axios
      .post("http://localhost:5000/api/login", req, { withCredentials: true })
      .then(function (response) {
        // const user = { token: response };
        localStorage.setItem("token", response.data.token);

        console.log("login resp ++++", response);
        if (token) {
          window.history.pushState({}, undefined, "/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    const redirect = () => {
      navigate(`/all-profiles`);
    };
    redirect();
  };

  return (
    <div className="login-ctn">
      <div className="login-wrap"></div>
      <div className="login-form-wrap">
        <h1>Welcome Polyglot!</h1>
        <p>Sign in to continue</p>
        <form className="login-form">
          <div className="email-wrap">
            <span id="mail" className="material-icons material-icons-outlined">
              mail
            </span>
            <div>
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="johndoe@gmail.com"
              />
            </div>
          </div>
          <div className="email-wrap">
            <span className="material-icons material-icons-outlined">lock</span>
            <div>
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="*******"
              />
            </div>
          </div>

          <button className="login-btn" onClick={loginUser}>
            Login
          </button>
          <p className="for-pass">Forgot Password?</p>
        </form>
        <button className="signup-btn" onClick={loginUser}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
