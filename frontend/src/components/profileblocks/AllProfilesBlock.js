import "../../styles/profileblocks/AllProfilesBlock.scss";

const AllProfilesBlock = (props) => {
  const { id, username, name, image } = props.user;
  return (
    <div className="block">
      <h1>{name}</h1>
      <p>{username}</p>
    </div>
  );
};

export default AllProfilesBlock;
