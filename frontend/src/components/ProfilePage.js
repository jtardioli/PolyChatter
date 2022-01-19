import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/ProfilePartner.scss";
import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
const axios = require("axios").default;

const PartnerProfile = (props) => {
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
        // handle success
        setUser(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [id]);

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
      <Navbar currentUser={props.currentUser} />
    </div>
  );
};

export default PartnerProfile;
