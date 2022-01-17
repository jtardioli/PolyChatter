import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { useState } from "react";
import axios from 'axios';

import "../styles/layout/EditProfilePage.scss";


const EditProfilePage = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");

  // const editProfile =() => {
  //   console.log(name, bio, country, image)
  // }

  const submit = () => {
    const data = new FormData() 
    data.append('file', image)
    let url = "http://localhost:3000/profile/edit";

    axios.post(url, data, { // receive two parameter endpoint url ,form data 
    })
    .then(res => { // then print response status
        console.warn(res);
    })

  }

  const handleInputChange = (event) => {
    setImage(event.target.files[0])
  }


  return (
    <div>
      <Header />
      <p>This is the ProfilePage</p>
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
          Self-introduction
          <input
            onChange={(e) => setBio(e.target.value)}
            type="text"
            name="bio"
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