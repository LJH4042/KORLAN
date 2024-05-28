import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../css/game.css";
import Canvas from "../../component/Canvas";
import Typing from "../../component/Typing";
import { CHO, JUNG, JONG } from "../../component/Word";
import { useNavigate } from "react-router-dom";

function CombineGame() {
  const navigate = useNavigate();

  const winNum = 1;
  const [charArray, setCharArray] = useState([]);

  const [quiz, setQuiz] = useState("");
  const [count, setCount] = useState(1);
  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [checkQuiz, setCheckQuiz] = useState(false);
  const [moreChance, setMoreChance] = useState(0);

  const [answerObj, setAnswerObj] = useState(false);
  const [answerObjName, setAnswerObjName] = useState("타이핑");
  const [answerObjButton, setAnswerObjButton] = useState(false);

  const separateText = () => {
    const result = [];
    for (let char of quiz) {
      const unicode = char.charCodeAt(0) - 44032;

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

  const resetButton = () => window.location.reload();

  const toggleAnswerObj = () => {
    setAnswerObj((answerObj) => !answerObj);
    setAnswerObjName((prev) => (prev === "타이핑" ? "캔버스" : "타이핑"));
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

  const fetchData = async () => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };

  const updateScore = async () => {
    const token = localStorage.getItem("token");

    const headerData = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.post(
        "http://localhost:5000/combineScore",
        { combineScore: winNum },
        headerData
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCharArray(separateText().sort(() => Math.random() - 0.5));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz]);

  useEffect(() => {
    if (score >= 50) updateScore();
  }, [score]);

  return (
    <div className="combineGameContainer">
      <div className="combineDiv">
        {gameOver ? (
          <div>
            <h1>Game Over, 점수: {score} / 50</h1>
            <button onClick={resetButton}>다시하기</button>
            <button onClick={() => navigate("/")}>홈으로</button>
          </div>
        ) : (
          <div>
            <div className="roundDiv">
              <h2>Round: {count} / 5</h2>
              <button onClick={toggleAnswerObj} disabled={answerObjButton}>
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
