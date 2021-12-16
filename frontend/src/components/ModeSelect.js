const ModeSelect = ({ Setmode }) => {
  const handleClick = (mode) => {
    Setmode(mode);
  };
  return (
    <div className="Modes">
      <div onClick={() => handleClick(1)} id="selectTeacher">
        Click to select Teacher Mode
      </div>
      <div onClick={() => handleClick(2)} id="selectStudent">
        Click to select Student Mode
      </div>
    </div>
  );
};

export default ModeSelect;
