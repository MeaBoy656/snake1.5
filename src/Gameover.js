import React, { useEffect } from "react";

const Gameover = (props) => {
  return (
    <div className="gameover">
      <h1>Game Over</h1>
      <p>Score: {props.score}</p>
      <p>Record: {props.record}</p>
      <button className="btn" onClick={() => props.resetGame()}>
        Start new game
      </button>
    </div>
  );
};

export default Gameover;
