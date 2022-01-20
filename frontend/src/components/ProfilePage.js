import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProfilePage.scss";
const axios = require("axios").default;

const ProfilePage = (props) => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const isMyProfile = Number(id) === props.currentUser;
  const {
    name,
    username,
    image,
    bio,
    countryname,
    emoji,
    nativeLanguage,
    targetLanguage,
  } = user;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/${id}`)
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log("ERROROROR ---", error);
      });
  }, []);

  const messageUser = () => {
    navigate(`/conversation/${id}`);
  };

  return (
    <div>
      <Header isMyProfile={isMyProfile} />
      <div>
        <img className="pfp" src={image} />
        <h1>{name}</h1>
        <p>{username}</p>

        <p>
          {countryname} {emoji}
        </p>
        <p>
          {nativeLanguage &&
            `${nativeLanguage.longform} lvl: ${nativeLanguage.level} =>${targetLanguage.longform} lvl: ${targetLanguage.level} `}
        </p>
        <p>{bio}</p>
      </div>
      {!isMyProfile && <div onClick={messageUser}>Message</div>}
      <Navbar currentUser={props.currentUser} />
    </div>
  );
};

export default ProfilePage;
