import Navbar from "./layout/Navbar";
import Header from "./layout/Header";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/EditProfilePage.scss";

const EditProfilePage = (props) => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    username: "",
    bio: "",
    countryData: "",
    nativeLanguage: "",
    targetLanguage: "",
  });
  console.log(user);

  const [image, setImage] = useState("");

  let navigate = useNavigate();

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
    axios
      .get(`http://localhost:5000/api/profile/edit`, config)
      .then(function (response) {
        // handle success
        console.log(response);
        setUser(response.data.userData[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const submit = () => {
    const data = new FormData();
    console.log(data);
    console.log(config);
    data.append("file", image);
    data.append("name", user.name);
    data.append("username", user.username);
    data.append("bio", user.bio);
    data.append("country", user.countryData);
    data.append("nativeLanguage", user.nativeLanguage);
    data.append("targetLanguage", user.targetLanguage);

    let url = "http://localhost:5000/api/profile/edit";

    // receive two parameter endpoint url ,form data
    axios.post(url, data, config).then((res) => {
      // then print response status
      console.warn(res);
    });

    const redirect = () => {
      navigate(`/profile/${user.id}`);
    };
    redirect();
  };

  const handleInputChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleInput = (event) => {
    const key = event.target.name;
    const val = event.target.value;
    setUser({ ...user, [key]: val });
  };

  return (
    <div>
      <Navbar currentUser={props.currentUser} />

      <div className="background-img">
        
      </div>
    
      <form className="vertical">
      
      <img className="img" src={user.image}  width="160px" height="160px" />
      <div>
      <label className="label">
            <input
              onChange={handleInputChange}
              // onChange={handleInput}
              type="file"
              name="image"
              className="input"
              style={{display:"none"}}
            />
            <div className="change-img">
              <span id="camera" class="material-icons material-icons-outlined">
                photo_camera
              </span>
            </div>
          </label>
        </div>

        <label className="label">
          Name
          <input
            onChange={handleInput}
            type="text"
            name="name"
            value={user.name}
            className="input"
          />
        </label>

        <label className="label">
          Username
          <input
            //onChange={(e) => setUsername(e.target.value)}
            onChange={handleInput}
            type="text"
            name="username"
            value={user.username}
            className="input"
          />
        </label>

        <label className="label">
          Native Language
          <input
            // onChange={(e) => setNativeLanguage(e.target.value)}
            onChange={handleInput}
            type="text"
            name="nativeLanguage"
            value={user.nativeLanguage}
            className="input"
          />
        </label>

        <label className="label">
          Target Language
          <input
            // onChange={(e) => setTargetLanguage(e.target.value)}
            onChange={handleInput}
            type="text"
            name="targetLanguage"
            value={user.targetLanguage}
            className="input"
          />
        </label>

        <label className="label">
          Country
          <input
            // onChange={(e) => setCountry(e.target.value)}
            onChange={handleInput}
            type="text"
            name="countryData"
            value={user.countryData}
            className="input"
          />
        </label>

        <label className="label">
          Self-introduction
          <input
            // onChange={(e) => setBio(e.target.value)}
            onChange={handleInput}
            type="text"
            name="bio"
            value={user.bio}
            className="input"
            placeholder="Add Bio"
            id="bio"
          />
        </label>

        <button className="btn" onClick={submit}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
