import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "../../css/game.css";
import Canvas from "../../component/Canvas";
import Typing from "../../component/Typing";
import { CHO, JUNG, JONG } from "../../component/Word";
import { useNavigate } from "react-router-dom";

function CombineGame() {
  const navigate = useNavigate();

  const winNum = 1; //서버로 보낼 점수 1점
  const [charArray, setCharArray] = useState([]); //랜덤 문자 배열
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

  //초성, 중성, 종성 분리
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

  const checkTrue = () => {
    setCheckQuiz(true);
    setAnswerObjButton(true);
  };

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
      await axios.get("http://localhost:5000/game").then((res) => {
        if (res.data.game && res.data.game.length > 0) {
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
        "http://localhost:5000/combineScore",
        { combineScore: winNum },
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
  }, [winNum]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCharArray(
      separateText()
        .sort(() => Math.random() - 0.5)
        .filter((char) => char !== "")
    );
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quiz]);

  useEffect(() => {
    if (score >= 100 && localStorage.getItem("token")) updateScore();
  }, [score, updateScore]);

  return (
    <div className="combineGameContainer">
      <div className="combineDiv">
        {gameOver ? (
          <div>
            <h1>Game Over, 점수: {score} / 100</h1>
            <button onClick={resetButton}>다시하기</button>
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
            <div className="textQuizDiv">
              <span>{charArray.join(" , ")}</span>
            </div>
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

export default CombineGame;
