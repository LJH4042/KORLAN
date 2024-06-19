import React, { useState } from "react";
import "../../css/game.css";
import ImageGame from "./ImageGame";
import axios from "axios";

function ImageLevel() {
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
      <h1>이미지 게임</h1>
      {levelList && (
        <div className="levelBtn">
          <button onClick={highGame}>상</button>
          <button onClick={middleGame}>중</button>
          <button onClick={lowGame}>하</button>
        </div>
      )}
      {high && <ImageGame gameLevel={"상"} />}
      {middle && <ImageGame gameLevel={"중"} />}
      {low && <ImageGame gameLevel={"하"} />}
    </div>
  );
}

export default ImageLevel;
