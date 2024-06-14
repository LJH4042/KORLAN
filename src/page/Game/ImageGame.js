import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "../../css/game.css";
import Canvas from "../../component/Canvas";
import Typing from "../../component/Typing";
import { useNavigate } from "react-router-dom";

function ImageGame({ gameLevel }) {
  const navigate = useNavigate();

  const winNum = 1; //서버로 보낼 점수 1점
  const [imageData, setImageData] = useState(""); //이미지, 텍스트 데이터
  const [quiz, setQuiz] = useState(""); //제시된 텍스트 퀴즈
  const [hint, setHint] = useState(""); //힌트
  const [length, setLength] = useState(""); //글자 수
  const [round, setRound] = useState(1); //라운드
  const [score, setScore] = useState(0); //점수
  const [gameOver, setGameOver] = useState(false); //게임 끝 여부
  const [checkQuiz, setCheckQuiz] = useState(false); //정답, 오답 확인
  const [moreChance, setMoreChance] = useState(0); //재도전 제공
  const [answerObj, setAnswerObj] = useState(false); //캔버스, 타이핑 변환
  const [answerObjName, setAnswerObjName] = useState("타이핑"); //캔버스, 타이핑 변환 버튼 이름
  const [answerObjButton, setAnswerObjButton] = useState(false); //캔버스, 타이핑 변환 버튼

  const checkTrue = () => {
    setCheckQuiz(true);
    setAnswerObjButton(true);
  };

  const resetGame = () => window.location.reload();

  const toggleAnswerObj = () => {
    setAnswerObj((answerObj) => !answerObj);
    setAnswerObjName((prev) => (prev === "타이핑" ? "캔버스" : "타이핑"));
  };

  const checkAnswer = (text) => {
    if (text === quiz) {
      alert("정답입니다.");
      checkTrue();
      setScore((score) => score + 10);
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
        { imageScore: winNum },
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
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winNum]);

  useEffect(() => {
    if (score >= 100 && localStorage.getItem("token")) updateScore();
  }, [score, updateScore]);

  return (
    <div className="imageGameContainer">
      <div className="imageDiv">
        {gameOver ? (
          <div>
            <h1>Game Over, 점수: {score} / 100</h1>
            <button onClick={resetGame}>난이도 선택</button>
            <button onClick={() => navigate("/")}>홈으로</button>
          </div>
        ) : (
          <div>
            <div className="roundDiv">
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
          <h2>
            글자 수: {length}, 힌트: {hint}
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
