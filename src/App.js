import React, {useState} from 'react';
import Game from './Game';
import "./app-style.css";

const App = () => {
  const [gameover, setGameover] = useState(false);
  return (
    <div>
      <Game setGameover={setGameover} gameover={gameover}/>
    </div>
  );
};

export default App;