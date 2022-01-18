import "../../styles/layout/Header.scss";
import { useNavigate } from "react-router-dom";

function Header(props) {
  let navigate = useNavigate();

  return (
    <div className="header">
      <h1>Header</h1>
      {props.isMyProfile && (
        <p
          onClick={() => {
            navigate(`/profile/edit`);
          }}
        >
          Settings
        </p>
      )}
    </div>
  );
}

export default Header;
