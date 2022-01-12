/**
 * This component renders the mode select screen for user, user can choose from teacher or student mode.
 * @param Setmode is the inherited setter for mode.
 * @returns Divs that onClick change the app mode to login(teacher) or student mode.
 */

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
