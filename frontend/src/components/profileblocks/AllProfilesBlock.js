import "../../styles/profileblocks/AllProfilesBlock.scss";
import { useNavigate } from "react-router-dom";

const AllProfilesBlock = (props) => {
  const { id, username, name, image, emoji, nativeLanguage, targetLanguage } =
    props.user;
  let navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/partner-profile/${id}`);
      }}
      className="block"
    >
      <h1>{name}</h1>
      <div className="info">
        <p>{username}</p>
        <p>{emoji}</p>
        <p>
          {nativeLanguage?.shortform} {" => "} {targetLanguage?.shortform}
        </p>
      </div>
    </div>
  );
};

export default AllProfilesBlock;
