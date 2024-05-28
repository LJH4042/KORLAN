import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../css/game.css";
import Canvas from "../../component/Canvas";
import Typing from "../../component/Typing";
import { useNavigate } from "react-router-dom";

function ImageGame() {
  const navigate = useNavigate();

  const winNum = 1;
  const [imageData, setImagaData] = useState([]);

  const [quiz, setQuiz] = useState("");
  const [count, setCount] = useState(1);
  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [checkQuiz, setCheckQuiz] = useState(false);
  const [moreChance, setMoreChance] = useState(0);

  const [answerObj, setAnswerObj] = useState(false);
  const [answerObjName, setAnswerObjName] = useState("타이핑");
  const [answerObjButton, setAnswerObjButton] = useState(false);

  const resetButton = () => window.location.reload();

  const toggleAnswerObj = () => {
    setAnswerObj((answerObj) => !answerObj);
    setAnswerObjName((prev) => (prev === "타이핑" ? "캔버스" : "타이핑"));
  };

  const checkAnswer = async (text) => {
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
          setImagaData(res.data.game[0].image);
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
        "http://localhost:5000/imageScore",
        { imageScore: winNum },
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
    if (score >= 50) updateScore();
  }, [score]);

  return (
    <div className="imageGameContainer">
      <div className="imageDiv">
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
            <img alt="이미지" src={`http://localhost:5000/file/${imageData}`} />
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

export default ImageGame;
