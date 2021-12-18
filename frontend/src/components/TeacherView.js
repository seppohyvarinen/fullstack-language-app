import { useState, useEffect } from "react";
import AddWords from "./AddWords";

const axios = require("axios").default;

const TeacherView = () => {
  const [words, setWords] = useState([]);

  const fetchAll = async () => {
    try {
      var response = await axios.get("/translations");

      var mapped = response.data.map(({ finnish, english }) => (
        <div className="Words">{finnish + " - " + english}</div>
      ));
      setWords(mapped);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="Teacherview">
      <div className="AddWords">
        <AddWords setWords={setWords} fetchAll={fetchAll} />
      </div>

      <div className="TranslationList">{words}</div>
    </div>
  );
};

export default TeacherView;
