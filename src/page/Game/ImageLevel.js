import React, { useState } from "react";
import "../../css/game.css";
import ImageGame from "./ImageGame";
import axios from "axios";
import lowLevelImg from "../../img/egg.png";
import middleLevelImg from "../../img/chick.png";
import highLevelImg from "../../img/chicken.png";

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
      <div className="gameContainer">
        {levelList ? (
          <div className="levelContainer">
            <h1>이미지 게임</h1>
            <p className="gameDescription_1">
              -그림을 보고 무엇인지 맞추며 단어를 익혀요!-
            </p>
            <div className="levelBtn">
              <button onClick={lowGame}>
                <div>
                  <img src={lowLevelImg} alt={"초급"} />
                </div>
                <p>초급</p>
              </button>
              <button onClick={middleGame}>
                <div>
                  <img src={middleLevelImg} alt={"중급"} />
                </div>
                <p>중급</p>
              </button>
              <button onClick={highGame}>
                <div>
                  <img src={highLevelImg} alt={"고급"} />
                </div>
                <p>고급</p>
              </button>
            </div>
            <div className="ruleDiv" style={{ backgroundColor: "#f9f9f9" }}>
              <p>-한 게임 당 총 10라운드로 진행됩니다.</p>
              <p>
                -상단에 나오는 이미지의 이름을 마우스 혹은 키보드로 적어 확인
                버튼을 누르면 정답을 확인합니다.
              </p>
              <p>
                -정답일 시 다음 라운드로 넘어가고, 오답일 시 다시 한번 더 답을
                적을 수 있습니다.
              </p>
              <p>
                -게임이 끝난 후 100점을 받으면 마이페이지에 스티커를 하나 받을
                수 있습니다.
              </p>
              <p>
                -마우스로 할 경우 최대한 또박또박 바르게 써주세요. 엉망으로 썼을
                시 오답 처리됩니다.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {high && <ImageGame gameLevel={"상"} />}
            {middle && <ImageGame gameLevel={"중"} />}
            {low && <ImageGame gameLevel={"하"} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageLevel;
