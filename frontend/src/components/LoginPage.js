import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      }
      redirect();
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
