import axios from "axios";
import React, { useEffect, useState } from "react";

function ImageGame() {
  const [imageData, setImagaData] = useState([]);

  const [quiz, setQuiz] = useState("");
  const [answer, setAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(false);

  const changeAnswer = (e) => setAnswer(e.target.value);

  const checkAnswer = () => {
    if (answer === quiz) {
      alert("정답입니다.");
      setCorrectAnswer(true);
    } else {
      alert("오답입니다.");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/image").then((res) => {
      setImagaData(res.data[0].image);
      setQuiz(res.data[0].title);
    });
  }, []);

  useEffect(() => {
    if (correctAnswer) {
      axios.get("http://localhost:5000/image").then((res) => {
        setImagaData(res.data[0].image);
        setQuiz(res.data[0].title);
        setAnswer("");
        setCorrectAnswer(false);
      });
    }
  }, [correctAnswer]);

  return (
    <div>
      <div>
        <img alt="이미지" src={`http://localhost:5000/file/${imageData}`} />
      </div>
      <input type="text" value={answer} onChange={changeAnswer} />
      <button onClick={checkAnswer}>제출</button>
    </div>
  );
}

export default ImageGame;
