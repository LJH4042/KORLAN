import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../css/game.css";
import Canvas from "../../component/Canvas";
import Typing from "../../component/Typing";

function CombineGame() {
  const CHO = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const JUNG = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  const JONG = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const winNum = 1;
  const [quiz, setQuiz] = useState("");
  const [count, setCount] = useState(1);
  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [checkQuiz, setCheckQuiz] = useState(false);
  const [moreChance, setMoreChance] = useState(0);

  const [answerObj, setAnswerObj] = useState(false);
  const [answerObjName, setAnswerObjName] = useState("타이핑");
  const [answerObjButton, setAnswerObjButton] = useState(false);

  const [charArray, setCharArray] = useState([]);

  const separateText = () => {
    const result = [];
    for (let char of quiz) {
      const unicode = char.charCodeAt(0) - 44032;
      console.log(unicode);

      const choIndex = parseInt(unicode / 588);
      const jungIndex = parseInt((unicode - choIndex * 588) / 28);
      const jongIndex = parseInt(unicode % 28);

      const choChar = CHO[choIndex];
      const jungChar = JUNG[jungIndex];
      const jongChar = JONG[jongIndex];

      result.push(choChar, jungChar, jongChar);
    }
    return result;
  };

  const resetButton = () => {
    window.location.reload();
  };

  const changeAnswerObj = () => {
    setAnswerObj((answerObj) => !answerObj);
    if (answerObjName === "타이핑") {
      setAnswerObjName("캔버스");
    } else {
      setAnswerObjName("타이핑");
    }
  };

  const checkAnswer = (text) => {
    if (text === quiz) {
      alert("정답입니다.");
      setCheckQuiz(true);
      setAnswerObjButton(true);
      setScore((score) => score + 10);
    } else {
      if (moreChance === 0) {
        alert("오답입니다. 한 번 더 시도해보세요.");
        setMoreChance((moreChance) => moreChance + 1);
      } else if (moreChance === 1) {
        alert("오답입니다. 다음 라운드로 넘어갑니다.");
        setMoreChance(0);
        setCheckQuiz(true);
        setAnswerObjButton(true);
      }
    }
  };

  const fetchData = () => {
    axios.get("http://localhost:5000/game").then((res) => {
      if (res.data.game && res.data.game.length > 0) {
        setQuiz(res.data.game[0].title);
        setCount(res.data.count);
        if (count >= 5) {
          setGameOver(true);
          alert(res.data.message);
        }
      } else {
        setGameOver(true);
        alert(res.data.message);
      }
    });
  };

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCharArray(separateText().sort(() => Math.random() - 0.5));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz]);

  useEffect(() => {
    if (score >= 50) {
      axios.post("http://localhost:5000/combineScore", {
        combineScore: winNum,
      });
    }
  }, [score]);

  return (
    <div className="combineGameContainer">
      <div className="combineDiv">
        {gameOver ? (
          <div>
            <h1>Game Over, 점수: {score} / 50</h1>
            <button onClick={resetButton}>다시하기</button>
          </div>
        ) : (
          <div>
            <div className="roundDiv">
              <h2>Round: {count} / 5</h2>
              <button onClick={changeAnswerObj} disabled={answerObjButton}>
                {answerObjName}
              </button>
            </div>
            <div className="textQuizDiv">
              {charArray.map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      {!gameOver && (
        <div>
          {answerObj ? (
            <div>
              <Typing
                checkAnswer={checkAnswer}
                fetchData={fetchData}
                quiz={quiz}
                checkQuiz={checkQuiz}
                setCheckQuiz={setCheckQuiz}
                setAnswerObjButton={setAnswerObjButton}
              />
            </div>
          ) : (
            <div>
              <Canvas
                checkAnswer={checkAnswer}
                fetchData={fetchData}
                quiz={quiz}
                checkQuiz={checkQuiz}
                setCheckQuiz={setCheckQuiz}
                setAnswerObjButton={setAnswerObjButton}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CombineGame;
