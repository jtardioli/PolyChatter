import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { useState } from "react";
import axios from 'axios';

import "../styles/layout/EditProfilePage.scss";


const EditProfilePage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");

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


  const submit = () => {
    const data = new FormData() 
    console.log(data)
    console.log(config)
    data.append('file', image);
    data.append('name', name);
    data.append('username', username);
    data.append('bio', bio);
    data.append('country', country);
    let url = "http://localhost:5000/api/profile/edit";
    
    // receive two parameter endpoint url ,form data
    axios.post(url, data, config).then(res => { // then print response status
        console.warn(res);
    })

  }

  const handleInputChange = (event) => {
    setImage(event.target.files[0])
  }


  return (
    <div>
      <Header />
      <p>This is the EditProfilePage</p>
      <Navbar />
      <form className="vertical">
      <label>
          Name
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
          />
        </label>

        <label>
          Username
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
          />
        </label>

        <label>
          Self-introduction
          <input
            onChange={(e) => setBio(e.target.value)}
            type="text"
            name="bio"
          />
        </label>

        <label>
          Image
          <input 
            onChange={handleInputChange}
            type="file"
            name="image"
          />
        </label>

        <label>
          Country
          <input
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
          />
        </label>
      </form>
      <button onClick={submit}>Save</button>
    </div>
  );
};

export default EditProfilePage;