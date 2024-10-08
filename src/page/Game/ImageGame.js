import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "../../css/game.css";
import Canvas from "../../component/Canvas";
import Typing from "../../component/Typing";
import { useNavigate } from "react-router-dom";

function ImageGame({ gameLevel }) {
  const navigate = useNavigate();

  const winNum = 1;
  const [imageData, setImageData] = useState("");
  const [quiz, setQuiz] = useState("");
  const [hint, setHint] = useState("");
  const [length, setLength] = useState("");
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [checkQuiz, setCheckQuiz] = useState(false);
  const [moreChance, setMoreChance] = useState(0);
  const [answerObj, setAnswerObj] = useState(false);
  const [answerObjName, setAnswerObjName] = useState("키보드");
  const [answerObjButton, setAnswerObjButton] = useState(false);
  const [gameoverText, setGameOverText] = useState(null);

  const checkTrue = () => {
    setCheckQuiz(true);
    setAnswerObjButton(true);
  };

  const resetGame = () => window.location.reload();

  const toggleAnswerObj = () => {
    setAnswerObj((answerObj) => !answerObj);
    setAnswerObjName((prev) => (prev === "키보드" ? "마우스" : "키보드"));
  };

  const checkAnswer = (text) => {
    if (text === "") alert("정답을 입력해주세요.");
    else if (text === quiz) {
      alert("정답입니다.");
      checkTrue();
      setScore((score) => score + 10);
      setMoreChance(0);
    } else {
      if (moreChance === 0) {
        alert("오답입니다. 한 번 더 시도해보세요.");
        setMoreChance((moreChance) => moreChance + 1);
      } else if (moreChance === 1) {
        alert("오답입니다. 다음 라운드로 넘어갑니다.");
        setMoreChance(0);
        checkTrue();
      }
    }
  };

  const fetchData = async () => {
    try {
      await axios
        .post("http://localhost:5000/gameData", { level: gameLevel })
        .then((res) => {
          if (res.data.game && res.data.game.length > 0) {
            setImageData(res.data.game[0].image);
            setQuiz(res.data.game[0].title);
            setRound(res.data.count);
            setHint(res.data.game[0].hint);
            setLength(res.data.game[0].length);
            if (round >= 10) {
              setGameOver(true);
              alert(res.data.message);
            }
          } else {
            setGameOver(true);
            alert(res.data.message);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const updateScore = useCallback(async () => {
    const token = localStorage.getItem("token");
    const headerData = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    try {
      await axios.post(
        "http://localhost:5000/imageScore",
        { imageScore: winNum, level: gameLevel },
        headerData
      );
    } catch (err) {
      if (err.response.status === 401) {
        try {
          const refreshRes = await axios.post(
            "http://localhost:5000/refresh",
            {},
            { withCredentials: true }
          );
          const newToken = refreshRes.data.token;
          localStorage.setItem("token", newToken);
          axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          updateScore();
        } catch (err) {
          console.error(err);
          localStorage.removeItem("token");
        }
      } else {
        console.error(err);
        localStorage.removeItem("token");
      }
    }
  }, [gameLevel]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winNum]);

  useEffect(() => {
    if (score >= 100 && localStorage.getItem("token")) updateScore();
  }, [score, updateScore]);

  useEffect(() => {
    if (score === 100) setGameOverText("★★★완벽해요!★★★");
    else if (score === 90) setGameOverText("★이 정도면 잘했어요!★");
    else if (score === 80) setGameOverText("★이 정도면 잘했어요!★");
    else if (score === 70) setGameOverText("●아쉽네요. 다시 도전해보세요.●");
    else if (score === 60) setGameOverText("●아쉽네요. 다시 도전해보세요.●");
    else if (score === 50) setGameOverText("◆기죽지 말고 열심히 해봐요.◆");
    else if (score === 40) setGameOverText("◆기죽지 말고 열심히 해봐요.◆");
    else if (30 >= score) setGameOverText("▼이건 좀.. 더 열심히 해봐요.▼");
  }, [score]);

  return (
    <div className="imageGameContainer">
      <div className="imageDiv">
        {gameOver ? (
          <div className="gameoverDiv">
            <h2 style={{ fontWeight: "600", fontSize: "40px" }}>
              당신의 점수는?
            </h2>
            <div className="gameoverTextDiv">
              <h1>{score} 점</h1>
              <h3 style={{ marginTop: "30px" }}>{gameoverText}</h3>
            </div>
            <div>
              <button className="actionButton" onClick={resetGame}>
                난이도 선택
              </button>
              <button className="actionButton" onClick={() => navigate("/")}>
                홈으로
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="roundDiv">
              <button onClick={resetGame}>난이도 선택</button>
              <h2>Round: {round} / 10</h2>
              <button onClick={toggleAnswerObj} disabled={answerObjButton}>
                {answerObjName}
              </button>
            </div>
            {imageData ? ( //레이아웃 변경을 방지에서 CLS의 성능을 높임
              <img
                alt="이미지"
                src={`http://localhost:5000/file/${imageData}`}
              />
            ) : (
              <div style={{ width: "500px", height: "300px" }}></div>
            )}
          </div>
        )}
      </div>
      {!gameOver && (
        <div>
          <h2 className="hintText">
            [{length}글자, {hint}]
          </h2>
          {answerObj ? (
            <Typing
              checkAnswer={checkAnswer}
              fetchData={fetchData}
              quiz={quiz}
              checkQuiz={checkQuiz}
              setCheckQuiz={setCheckQuiz}
              setAnswerObjButton={setAnswerObjButton}
            />
          ) : (
            <Canvas
              checkAnswer={checkAnswer}
              fetchData={fetchData}
              quiz={quiz}
              checkQuiz={checkQuiz}
              setCheckQuiz={setCheckQuiz}
              setAnswerObjButton={setAnswerObjButton}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ImageGame;
