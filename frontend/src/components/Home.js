import { useState } from "react";
import ModeSelect from "./ModeSelect";
import TeacherView from "./TeacherView";
import StudentView from "./StudentView";

const Home = () => {
  const [mode, Setmode] = useState(0);
  return (
    <div>
      {mode === 0 && <ModeSelect Setmode={Setmode} />}
      {mode === 1 && <TeacherView Setmode={Setmode} />}
      {mode === 2 && <StudentView Setmode={Setmode} />}
    </div>
  );
};

export default Home;
