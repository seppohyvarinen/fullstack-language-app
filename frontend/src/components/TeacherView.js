import { useState, useEffect } from "react";
import AddWords from "./AddWords";

const axios = require("axios").default;

const TeacherView = () => {
  const [words, setWords] = useState([]);

  useEffect(
    () => {
      const fetchAll = async () => {
        try {
          var response = await axios.get("/translations");

          var mapped = response.data.map(
            ({ finnish, english }) => finnish + " - " + english
          );
          setWords(mapped);
        } catch (error) {
          alert(error);
        }
      };
      fetchAll();
    },
    [],
    [words]
  );

  return (
    <div>
      <AddWords setWords={setWords} />
      {words}
    </div>
  );
};

export default TeacherView;
