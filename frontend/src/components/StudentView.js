import { useState } from "react";
import LearningMode from "./LearningMode";

const StudentView = () => {
  const [mode, setMode] = useState(0);
  return <>{mode === 0 && <LearningMode setMode={setMode} />}</>;
};

export default StudentView;
