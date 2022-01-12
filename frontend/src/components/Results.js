/**
 * This component is rendered when game is through.
 * @param {number} score is the player score.
 * @param {number} amount is the amount of questions in the game.
 * @returns div that contains user score and a "reaction" according to user score.
 */

const Results = ({ score, amount }) => {
  var reaction = "";
  if (score === amount) {
    reaction = "Kaikki oikein! Aivan mahtavaa";
  } else if (amount - score === 1) {
    reaction = "Loistavaa, vain yksi meni väärin. Kokeile vielä kerran!";
  } else if (amount - score === 2) {
    reaction = "Suurin osa meni oikein, hyvä! Koeta vielä uudelleen!";
  } else {
    reaction = "Harjoitus tekee mestarin!";
  }

  return (
    <div className="ResultScreen">
      <div className="ResultsConstant">
        Sait {score} / {amount} pistettä!
      </div>
      <div className="ResultReaction">{reaction}</div>
    </div>
  );
};

export default Results;
