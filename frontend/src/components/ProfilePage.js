import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProfilePage.scss";
import SkillBar from "./profileblocks/SkillBar";
import Cookies from "js-cookie";

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

  const startConversation = () => {
    if (Number(id) && props.currentUser) {
      const token = Cookies.get("token"); // => 'value'

      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      if (token) {
        axios
          .get(
            `http://localhost:5000/api/conversation-from-users/${id}`,
            config
          )
          .then(function (response) {
            if (response.data[0]) {
              const data = response.data[0];
              navigate(`/conversation/${data.id}`);
            } else {
              axios
                .post(
                  `http://localhost:5000/api/create-convo/${props.currentUser}/${id}`
                )
                .then(function (response) {
                  if (response.data[0]) {
                    console.log(response.data[0]);
                    const data = response.data[0];
                    console.log(data.id);
                    navigate(`/conversation/${data.id}`);
                  }
                });
            }
          })
          .catch(function (error) {
            // handle error
            console.log("ERROROROR ---", error);
          });
      }
    }
  };

  return (
    <div className="my-profile-ctn">
      <div className="img-ctn">
        <div className="background">
          <div>
            <img className="pfp" src={image} alt="" />
            {isMyProfile ? (
              <div
                onClick={() => {
                  navigate(`/profile/edit`);
                }}
                className="setting-wrap"
              >
                <span
                  id="settings"
                  className="material-icons material-icons-outlined"
                >
                  settings
                </span>
              </div>
            ) : (
              <div onClick={startConversation} className="setting-wrap">
                <span
                  id="settings"
                  className="material-icons material-icons-outlined"
                >
                  email
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <h1>{name}</h1>
      <h2>@{username}</h2>
      <div className="profile-divider"></div>
      <div className="profile-info">
        <div className="languages">
          <div>
            <div>{nativeLanguage?.shortform}</div>
            <SkillBar level={nativeLanguage?.level} />
          </div>

          <span className="material-icons material-icons-outlined" id="arrow">
            multiple_stop
          </span>
          <div>
            <div>{targetLanguage?.shortform}</div>
            <SkillBar level={targetLanguage?.level} />
          </div>
        </div>
        <div>
          <span id="map" className="material-icons material-icons-outlined">
            location_on
          </span>
          <span className="country-profile">{countryname}</span>
        </div>
      </div>
      <div className="profile-divider"></div>
      <div className="bio-ctn">
        <h4>About</h4>
        <p>{bio}</p>
      </div>

      <Navbar currentUser={props.currentUser} />
    </div>
  );
};

export default ProfilePage;
