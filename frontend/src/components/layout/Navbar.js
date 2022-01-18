import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/layout/Navbar.scss";

const Navbar = (props) => {
  let navigate = useNavigate();

  return (
    <ul className="navbar">
      <li>
        <Link to="/conversations">All Chats</Link>
      </li>
      <li>
        <Link to="/">All Profiles</Link>
      </li>
      <li
        onClick={() => {
          navigate(`/profile/${props.currentUser}`);
        }}
      >
        My Profile
      </li>
    </ul>
  );
};

export default Navbar;
