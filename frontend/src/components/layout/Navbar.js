import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/layout/Navbar.scss";

const axios = require("axios").default;

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState({});
  const id = currentUser.id;
  let navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    // window.history.pushState({}, undefined, "/login");
  }

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/current-user/", config)
        .then(function (response) {
          console.log("User Resp ------------:", response.data.user);
          setCurrentUser(response.data.user);
        })
        .catch(function (error) {
          // handle error
          console.log("ERROROROR ---", error);
        })
        .then(function () {
          // always executed
        });
    }
  }, []);
  console.log("this is the id", id);

  return (
    <ul className="navbar">
      <li>
        <Link to="/conversations">All Chats</Link>
      </li>
      <li>
        <Link to="/">All Profiles</Link>
      </li>
      <li
        onClick={() => {
          navigate(`/partner-profile/${id}`);
        }}
      >
        My Profile
      </li>
    </ul>
  );
};

export default Navbar;
