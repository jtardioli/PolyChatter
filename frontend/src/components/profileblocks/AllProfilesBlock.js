import "../../styles/profileblocks/AllProfilesBlock.scss";

const AllProfilesBlock = (props) => {
  const { id, username, name, image, emoji, nativeLanguage, targetLanguage } =
    props.user;
  return (
    <div className="block">
      <h1>{name}</h1>
      <div className="info">
        <p>{username}</p>
        <p>{emoji}</p>
        <p>
          {nativeLanguage.shortform} => {targetLanguage.shortform}
        </p>
      </div>
    </div>
  );
};

export default AllProfilesBlock;
