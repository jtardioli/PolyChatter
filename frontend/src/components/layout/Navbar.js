import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/layout/Navbar.scss";

const Navbar = (props) => {
  let navigate = useNavigate();

  return (
    <ul className="navbar">
      <li>
        <Link to="/conversations">
          <span class="material-icons material-icons-outlined" id="nav-icon">
            <span class="material-icons-outlined">question_answer</span>
          </span>
        </Link>
      </li>
      <li>
        <Link to="/">
          <span class="material-icons material-icons-outlined" id="nav-icon">
            explore
          </span>
        </Link>
      </li>
      <li
        onClick={() => {
          navigate(`/profile/${props.currentUser}`);
        }}
      >
        <span class="material-icons material-icons-outlined" id="nav-icon">
          person
        </span>
      </li>
    </ul>
  );
};

export default Navbar;
