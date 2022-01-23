import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { useEffect, useState } from "react";
import AllProfilesBlock from "./profileblocks/AllProfilesBlock";
const axios = require("axios").default;

const AllProfilesPage = (props) => {
  const [users, setUsers] = useState(null);

  // Grab users from DB
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then(function (response) {
        // handle success
        setUsers(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  let allProfiles;
  let profiles;
  if (users) {
    profiles = users.filter((user) => {
      return user.id !== props.currentUser;
    });

    allProfiles = profiles.map((user) => {
      return <AllProfilesBlock key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <Header text="Find Partners" />
      <div className="scroll">{users && allProfiles}</div>

      <Navbar currentUser={props.currentUser} />
    </div>
  );
};

export default AllProfilesPage;
