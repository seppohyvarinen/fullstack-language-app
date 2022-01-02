import { useState, useEffect } from "react";

const axios = require("axios").default;

const GameScreen = ({ keyword }) => {
  const [words, setWords] = useState([]);
  const fetchByTag = async (keyword) => {
    try {
      var response = await axios.get("/translations", {
        params: {
          tag: { keyword },
        },
      });
      var mapped = response.data.map(({ fin, eng }) => (
        <div>
          {fin}
          {eng}
        </div>
      ));
      setWords(mapped);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchByTag();
  }, []);
  return <div>{words}</div>;
};

export default GameScreen;
