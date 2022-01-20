import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import AllConversationsPage from "./components/AllConversationsPage";
import ProfilePage from "./components/ProfilePage";
import AllProfilesPage from "./components/AllProfilesPage";
import EditProfilePage from "./components/EditProfilePage";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { ConversationPage } from "./components/ConversationPage";

const axios = require("axios").default;

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const token = Cookies.get("token"); // => 'value'
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

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AllProfilesPage currentUser={currentUser.id} />}
        ></Route>
        <Route path="/conversations" element={<AllConversationsPage />}></Route>
        <Route
          path="/profile/:id"
          element={<ProfilePage currentUser={currentUser.id} />}
        ></Route>
        <Route
          path="/conversation/:id"
          element={<ConversationPage currentUser={currentUser.id} />}
        ></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/all-profiles" element={<AllProfilesPage />}></Route>
        <Route path="/profile/edit" element={<EditProfilePage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
