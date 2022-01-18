import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/ProfilePartner.scss";
const axios = require("axios").default;

const PartnerProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
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
  }, []);
  console.log(user);
  return (
    <div>
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
    </div>
  );
};

export default PartnerProfile;
