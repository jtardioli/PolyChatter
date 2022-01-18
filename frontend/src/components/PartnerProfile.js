import { useParams } from "react-router-dom";

const PartnerProfile = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <p>This is the id {id}</p>
    </div>
  );
};

export default PartnerProfile;
