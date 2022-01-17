import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { useEffect, useState } from "react";

const axios = require("axios").default;

const ProfilePage = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.history.pushState({}, undefined, "/login");
  }
  console.log("token -----", token);
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5000/api/user", config)
        .then(function (response) {
          console.log("User Resp ------------:", response.data);
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

  return (
    <div>
      <Header />
      <p>This is the ProfilePage</p>
      <Navbar />
    </div>
  );
};

export default ProfilePage;
