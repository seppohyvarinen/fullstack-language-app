import { useState, useEffect } from "react";
import AddWords from "./AddWords";

const axios = require("axios").default;

const TeacherView = () => {
  const [words, setWords] = useState([]);

  const fetchAll = async () => {
    try {
      var response = await axios.get("/translations");

      var mapped = response.data.map(({ finnish, english }) => (
        <div>{finnish + " - " + english}</div>
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
    <div>
      <AddWords setWords={setWords} fetchAll={fetchAll} />
      {words}
    </div>
  );
};

export default TeacherView;
