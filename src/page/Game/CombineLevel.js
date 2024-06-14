import React, { useState } from "react";
import "../../css/game.css";
import CombineGame from "./CombineGame";
import axios from "axios";

function CombineLevel() {
  const [levelList, setLevelList] = useState(true);
  const [high, setHight] = useState(false);
  const [middle, setMiddle] = useState(false);
  const [low, setLow] = useState(false);

  const highGame = () => {
    axios.post("http://localhost:5000/game/reset");
    setHight(true);
    setLevelList(false);
  };
  const middleGame = () => {
    axios.post("http://localhost:5000/game/reset");
    setMiddle(true);
    setLevelList(false);
  };
  const lowGame = () => {
    axios.post("http://localhost:5000/game/reset");
    setLow(true);
    setLevelList(false);
  };

  return (
    <div className="imageGameContainer">
      <h1>낱말 조합</h1>
      {levelList && (
        <div className="levelBtn">
          <button onClick={highGame}>상</button>
          <button onClick={middleGame}>중</button>
          <button onClick={lowGame}>하</button>
        </div>
      )}
      {high && <CombineGame gameLevel={"상"} />}
      {middle && <CombineGame gameLevel={"중"} />}
      {low && <CombineGame gameLevel={"하"} />}
    </div>
  );
}

export default CombineLevel;
