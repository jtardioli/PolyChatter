import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const axios = require("axios").default;

const PartnerProfile = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/${id}`)
      .then(function (response) {
        // handle success
        setUser(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);
  console.log(user);
  return (
    <div>
      <p>This is the id {id}</p>
    </div>
  );
};

export default PartnerProfile;
