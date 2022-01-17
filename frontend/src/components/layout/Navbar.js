import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../styles/layout/Navbar.scss";

const Navbar = () => {
  return (
    <ul className="navbar">
      <li>
        <Link to="/conversations">All Chats</Link>
      </li>
      <li>
        <Link to="/">All Profiles</Link>
      </li>
      <li>
        <Link to="/profile">My Profile</Link>
      </li>
    </ul>
  );
};

export default Navbar;
