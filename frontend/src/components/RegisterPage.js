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
  const signIn = () => {
    const redirect = () => {
      navigate(`/login`);
    }
    redirect();
  }

  return (
    <div className="login-ctn">
      <div className="login-wrap"></div>
      <div className="login-form-wrap">
        <h1>Let's Sign You Up!</h1>
        {/* <h4>Create Account.</h4> */}
        <form className="login-form">
          <div className="email-wrap">
            {/* <span className="material-icons material-icons-outlined">
              User
            </span> */}
            <span className="material-icons">
face
</span>
            <div>
              <label>Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="email"
                name="email"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div className="email-wrap">
          <span className="material-icons material-icons-outlined">
              person
            </span>
            <div>
              <label>Username</label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="email"
                name="email"
                placeholder="johndoe"
              />
            </div>
          </div>
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
          <div className="email-wrap">
          <span className="material-icons material-icons-outlined">
            location_on
          </span>
            <div>
              <label>Country</label>
              <input
                onChange={(e) => setCountryName(e.target.value)}
                type="email"
                name="email"
                placeholder="Your Country"
              />
            </div>
          </div>
          <div className="email-wrap">
          <span className="material-icons material-icons">
            language
          </span>
            <div>
              <label>Native Language</label>
              <input
                onChange={(e) => setNativeLanguage(e.target.value)}
                type="email"
                name="email"
                placeholder="Your Native Language"
              />
            </div>
          </div>
          <div className="email-wrap">
          <span className="material-icons">
            translate
          </span>
            <div>
              <label>Target Language</label>
              <input
                onChange={(e) => setTargetLanguage(e.target.value)}
                type="email"
                name="email"
                placeholder="Language You Are Learning"
              />
            </div>
          </div>

          <button className="login-btn" onClick={registerUser}>Sign Up</button>
          <p className="for-pass">Already Have an Account?</p>
        </form>
        <button className="signup-btn" onClick={signIn}>
           Sign In
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
