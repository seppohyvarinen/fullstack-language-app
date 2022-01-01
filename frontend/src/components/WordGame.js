import { useState, useEffect } from "react";

const axios = require("axios").default;

const WordGame = ({ gameMode }) => {
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    try {
      var response = await axios.get("/translations/tags");

      var mapped = response.data.map(({ tag }) => (
        <div className="Gametags">{tag}</div>
      ));
      setTags(mapped);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);
  return (
    <>
      You are playing with game mode {gameMode}
      <div>{tags}</div>
    </>
  );
};

export default WordGame;
