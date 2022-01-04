const ModeSelect = ({ Setmode }) => {
  const handleClick = (mode) => {
    Setmode(mode);
  };
  return (
    <div className="Modes">
      <div onClick={() => handleClick(1)} id="selectTeacher">
        Opettajille
      </div>

      <div onClick={() => handleClick(2)} id="selectStudent">
        Oppilaille
      </div>
    </div>
  );
};

export default ModeSelect;
