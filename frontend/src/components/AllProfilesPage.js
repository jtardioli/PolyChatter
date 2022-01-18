import Navbar from "./layout/Navbar";
import Header from "./layout/Header";
import { useEffect, useState } from "react";
import AllProfilesBlock from "./profileblocks/AllProfilesBlock";
const axios = require("axios").default;

const AllProfilesPage = () => {
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
  console.log("These are the users", users);
  let allProfiles;
  if (users) {
    allProfiles = users.map((user) => {
      return <AllProfilesBlock key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <Header />
      <div className="scroll">{users && allProfiles}</div>

      <Navbar />
    </div>
  );
};

export default AllProfilesPage;
