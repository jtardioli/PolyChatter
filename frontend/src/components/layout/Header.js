import "../../styles/layout/Header.scss";

function Header(props) {
  return <div className="header">Header {props.isMyProfile && "settings"}</div>;
}

export default Header;
