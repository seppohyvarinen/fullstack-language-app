import { useState, useEffect, useRef } from "react";

const axios = require("axios").default;

const GameScreen = ({ keyword, gameMode }) => {
  const [words, setWords] = useState([]);
  const [gameOn, setGameOn] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const correct = useRef("");

  const handleStartGame = async (k) => {
    try {
      var response = await axios.get("/translations", {
        params: {
          tag: k,
        },
      });
      var mapped = response.data.map(({ finnish, english }) => ({
        finnish: finnish,
        english: english,
      }));

      setWords(mapped);
      setGameOn(true);
    } catch (error) {
      alert(error);
    }
  };

  const Game = (mode) => {
    var question = [];
    var answers = [];

    mode === 1
      ? (correct.current = words[index].english)
      : (correct.current = words[index].finnish);

    question = words.map(({ finnish, english }) => {
      if (mode === 1) {
        return <div className="Question">{finnish}</div>;
      } else {
        return <div className="Question">{english}</div>;
      }
    });

    answers = words.map(({ finnish, english }) => {
      if (mode === 1) {
        return (
          <div className="Answer" onClick={() => next(finnish)}>
            {finnish}
          </div>
        );
      } else {
        return (
          <div className="Answer" onClick={() => next(english)}>
            {english}
          </div>
        );
      }
    });

    return (
      <div>
        <div className="Score">{score}</div>
        <div>{question[index]}</div>
        <div>{answers}</div>
      </div>
    );
  };

  const next = (a) => {
    if (a === correct.current) {
      setScore(score + 1);
    }
    setIndex(index + 1);
  };

  return (
    <div className="modalBG">
      {" "}
      <div className="Screen">
        {!gameOn && (
          <div className="Instructions">
            <button onClick={() => handleStartGame(keyword)}>
              start the game
            </button>
          </div>
        )}
        {gameOn && Game(gameMode)}
      </div>
    </div>
  );
};

export default GameScreen;
