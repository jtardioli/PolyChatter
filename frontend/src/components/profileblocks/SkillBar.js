import "../../styles/profileblocks/SkillBar.scss";
const SkillBar = (props) => {
  const level = props.level;
  return (
    <div className="bar">
      <div className={level > 0 ? "bar-inner skill" : "bar-inner"}></div>
      <div className={level > 1 ? "bar-inner skill" : "bar-inner"}></div>
      <div className={level > 2 ? "bar-inner skill" : "bar-inner"}></div>
      <div className={level > 3 ? "bar-inner skill" : "bar-inner"}></div>
      <div className={level > 4 ? "bar-inner skill" : "bar-inner"}></div>
      <div className={level > 5 ? "bar-inner skill" : "bar-inner"}></div>
    </div>
  );
};

export default SkillBar;
