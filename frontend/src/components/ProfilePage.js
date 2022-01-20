import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { useNavigate } from "react-router-dom";
const axios = require("axios").default;

const PartnerProfile = (props) => {
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
    if (token) {
      axios
        .get("http://localhost:5000/api/user", config)
        .then(function (response) {
          console.log("User Resp ------------:", response.data);
        })
        .catch(function (error) {
          // handle error
          console.log("ERROROROR ---", error);
        })
        .then(function () {
          // always executed
        });
    }
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
