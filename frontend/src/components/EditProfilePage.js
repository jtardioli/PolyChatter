import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import "../styles/layout/EditProfilePage.scss";


const EditProfilePage = () => {

  const [user, setUser] = useState({
    id:"",
    name:"",
    username:"",
    bio:"",
    countryname:"",
    nativeLanguage:"",
    targetLanguage:""
  });
  console.log(user)

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
    console.log(response)
    setUser(response.data.userData[0])
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}, []);


  const submit = () => {
    const data = new FormData() 
    console.log(data)
    console.log(config)
    data.append('file', image);
    data.append('name', user.name);
    data.append('username', user.username);
    data.append('bio', user.bio);
    data.append('country', user.countryname);
    data.append('nativeLanguage', user.nativeLanguage);
    data.append('targetLanguage', user.targetLanguage);
    
    let url = "http://localhost:5000/api/profile/edit";

    // receive two parameter endpoint url ,form data
    axios.post(url, data, config).then(res => { // then print response status
        console.warn(res);
    })

    const redirect = () => {
      navigate(`/profile/${user.id}`);
    }
    redirect();
  }

  const handleInputChange = (event) => {
    setImage(event.target.files[0])
  }

  const handleInput = (event) => {
    const key = event.target.name
    const val = event.target.value
    setUser({...user, [key]: val})
  }


  return (
    <div>
      <Header />
      <p>This is the EditProfilePage</p>
      <Navbar />
      <div> 
        
      </div>
    
      <form className="vertical">
      <img src={user.image}  width="200" height="200" />
      
      <label>
          Image
          <input 
            onChange={handleInputChange}
            // onChange={handleInput}
            type="file"
            name="image"

          />
        </label>
      
      <label>
          Name
          <input
            onChange={handleInput}
            type="text"
            name="name"
            value={user.name}
          />
        </label>

        <label>
          Username
          <input
            //onChange={(e) => setUsername(e.target.value)}
            onChange={handleInput}
            type="text"
            name="username"
            value={user.username}
          />
        </label>

        <label>
          Self-introduction
          <input
            // onChange={(e) => setBio(e.target.value)}
            onChange={handleInput}
            type="text"
            name="bio"
            value={user.bio}
          />
        </label>

        <label>
          Country
          <input
            // onChange={(e) => setCountry(e.target.value)}
            onChange={handleInput}
            type="text"
            name="countryname"
            value={user.countryname}
          />
        </label>
        <label>
          Native Language
          <input
            // onChange={(e) => setNativeLanguage(e.target.value)}
            onChange={handleInput}
            type="text"
            name="nativeLanguage"
            value={user.nativeLanguage}
          />
        </label>
        <label>
          Target Language
          <input
            // onChange={(e) => setTargetLanguage(e.target.value)}
            onChange={handleInput}
            type="text"
            name="targetLanguage"
            value={user.targetLanguage}
          />
        </label>
      </form>
      <button onClick={submit}>Save</button>
    </div>
  );
};

export default EditProfilePage;