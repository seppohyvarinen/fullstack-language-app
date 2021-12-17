import { useState, useEffect } from "react";

const axios = require("axios").default;

const TeacherView = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
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
  }, []);

  return <div>{words}</div>;
};

export default TeacherView;
