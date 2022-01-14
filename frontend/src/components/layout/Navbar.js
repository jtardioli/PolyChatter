import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "../../styles/layout/Navbar.scss";

const Navbar = () => {
  return (
    <React.Fragment>
      <ul className="navbar">
        <li>
          <Link to="/all-profiles">All Profiles</Link>
        </li>
        <li>
          <Link to="/">All Chats</Link>
        </li>
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default Navbar;
