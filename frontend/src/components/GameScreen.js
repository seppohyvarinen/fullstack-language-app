import { useState, useRef } from "react";
import Results from "./Results";

const axios = require("axios").default;

/**
 * This component contains all the logic and functions used in the word game. It fetches words based on the keyword
 * it receives, then renders them to player according to game mode.
 * @param {String} keyword is the tag that defines which words are fetched from database.
 * @param {Number} gameMode is the numeric value of gameMode that defines whether game is played fin-eng or eng-fin.
 * @param {Number} amount is the amount of words used in the game.
 * @param {boolean} back is the state from previous component used to return from the game screen.
 * @returns
 */

const GameScreen = ({ keyword, gameMode, amount, back }) => {
  const [words, setWords] = useState([]);
  const [maxAmount, setMaxAmount] = useState(amount);
  const [permanentWords, setPermanentWords] = useState([]);
  const [gameOn, setGameOn] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameThrough, setGameThrough] = useState(false);
  const [firstPlay, setFirstPlay] = useState(true);
  const needShuffle = useRef(true);
  const userAnswer = useRef("");
  const answerColor = useRef("");
  const correct = useRef("");

  /**
   * Async function that is called when starting or replaying the game.
   * Fetches desired words from the database with axios.get request. Words are then mapped to Words and permanentWords states.
   * @param k is the tag or keyword used when fetching for certain words from the database.
   */

  const handleStartGame = async (k) => {
    try {
      setGameThrough(false);
      setFirstPlay(false);
      setScore(0);
      setIndex(0);
      var response = await axios.get("/translations", {
        params: {
          tag: k,
        },
      });
      var mapped = response.data.map(({ finnish, english }) => ({
        finnish: finnish,
        english: english,
        color: "",
      }));

      if (mapped.length > amount) {
        var cut = ArrayCutter(mapped, amount);

        setWords(cut);
        setPermanentWords(cut);
      } else {
        setMaxAmount(mapped.length);
        setWords(mapped);
        setPermanentWords(mapped);
      }

      setGameOn(true);
    } catch (error) {
      alert(error);
    }
  };

  const Game = (mode) => {
    var question = [];
    var answers = [];
    if (needShuffle.current) {
      shuffle(words);
      needShuffle.current = false;
    }

    if (index < maxAmount) {
      mode === 1
        ? (correct.current = permanentWords[index].english)
        : (correct.current = permanentWords[index].finnish);
    }

    question = permanentWords.map(({ finnish, english, color }) => {
      if (mode === 1) {
        return <div className="Question">{finnish}</div>;
      } else {
        return <div className="Question">{english}</div>;
      }
    });

    answers = words.map(({ finnish, english, color }) => {
      if (mode === 2) {
        return (
          <div className="Answer" id={color} onClick={() => next(finnish)}>
            {finnish}
          </div>
        );
      } else {
        return (
          <div className="Answer" id={color} onClick={() => next(english)}>
            {english}
          </div>
        );
      }
    });

    const next = (a) => {
      userAnswer.current = a;

      if (a === correct.current) {
        answerColor.current = "Correct";
      } else {
        answerColor.current = "Wrong";
      }

      const handleColor = (answer) => {
        var temporary = [...words];

        const iddex = temporary.findIndex(
          (ans) => ans.english === answer || ans.finnish === answer
        );
        temporary[iddex].color = answerColor.current;
        setWords(temporary);
      };

      handleColor(a);

      const checkForCorrect = (answer) => {
        if (answer === correct.current) {
          setScore(score + 1);
        }
        answerColor.current = "";
        handleColor(answer);
        needShuffle.current = true;

        setIndex(index + 1);

        userAnswer.current = "";
        if (index === maxAmount - 1) {
          setGameThrough(true);
          setGameOn(false);
        }
      };

      setTimeout(() => checkForCorrect(a), 1000);
    };

    return (
      <div>
        <div className="Score">Pisteet: {score}</div>
        <div className="QnA">
          <div>{question[index]}</div>
          <div>{answers}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="modalBG">
      {" "}
      <div className="Screen">
        {firstPlay && (
          <div className="Instructions">
            <h2>Ohjeet:</h2>
            <h4>
              {" "}
              Klikkaa oikeaa käännöstä annetuista vaihtoehdoista, yritä saada
              täydet pisteet!
            </h4>
            <button onClick={() => handleStartGame(keyword)}>
              Aloita peli
            </button>
          </div>
        )}
        {gameOn && Game(gameMode)}
        {gameThrough && (
          <>
            {" "}
            <Results amount={maxAmount} score={score} />
            <div className="ResultScrButtons">
              {" "}
              <button onClick={() => handleStartGame(keyword)}>
                Pelaa Uudelleen
              </button>
              <button onClick={() => back(false)}>Palaa valikkoon</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ArrayCutter = (arr, size) => {
  var indexes = [];
  var newArray = [];
  var max = arr.length;
  for (var i = 0; i < size; i++) {
    let newIndex = Math.floor(Math.random() * max);
    while (indexes.includes(newIndex)) {
      newIndex = Math.floor(Math.random() * max);
    }
    indexes.push(newIndex);
  }
  console.log(arr);
  console.log(indexes);

  for (var i = 0; i < indexes.length; i++) {
    newArray.push(arr[indexes[i]]);
  }

  return newArray;
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  console.log("now shuffling");

  return array;
};

export default GameScreen;
