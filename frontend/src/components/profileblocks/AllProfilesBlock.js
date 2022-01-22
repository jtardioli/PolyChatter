import "../../styles/profileblocks/AllProfilesBlock.scss";
import { useNavigate } from "react-router-dom";
import SkillBar from "./SkillBar";

const AllProfilesBlock = (props) => {
  const {
    id,
    username,
    name,
    image,
    emoji,
    nativeLanguage,
    targetLanguage,
    bio,
  } = props.user;
  let navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/profile/${id}`);
      }}
      className="block"
    >
      <div className="pic-emoji">
        <img
          className="profile-pic"
          src="https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt=""
        ></img>
        <span className="emoji">{emoji}</span>
      </div>

      <div className="info">
        <div className="info-inner">
          <div className="name">
            <h2>{name}</h2>
            <span>@{username}</span>
          </div>
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

          <p>{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default AllProfilesBlock;
