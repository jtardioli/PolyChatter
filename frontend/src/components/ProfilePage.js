import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ProfilePage.scss";
import SkillBar from "./profileblocks/SkillBar";
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
    <div className="my-profile-ctn">
      <div className="img-ctn">
        <div className="background">
          <img
            className="pfp"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
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
        <div className="vertical-div"></div>
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
        <p>
          Migas jianbing semiotics ramps af typewriter single-origin coffee
          master cleanse next level meh art party echo park kale chips raw denim
          pickled. Twee pour-over shaman, affogato selvage copper mug small
          batch. Listicle try-hard sriracha activated charcoal lumbersexual
          ennui. Tattooed synth master cleanse artisan offal aesthetic fashion
          axe. Before they sold out try-hard hot chicken yr, actually tacos
          viral meggings enamel pin iceland VHS. Pour-over dreamcatcher offal
          tousled vexillologist meggings before they sold out ramps craft beer.
          +1 art party shoreditch, helvetica affogato ramps green juice
          sustainable.
        </p>
      </div>

      <Navbar currentUser={props.currentUser} />
    </div>
  );
};

export default ProfilePage;
