import React, { useState } from "react";

function Typing({
  checkAnswer,
  fetchData,
  quiz,
  checkQuiz,
  setCheckQuiz,
  setAnswerObjButton,
}) {
  const [typing, setTyping] = useState("");

  const changeTyping = (e) => setTyping(e.target.value);

  const sumbitAnswer = () => {
    checkAnswer(typing);
  };

  const nextLevel = () => {
    fetchData();
    setCheckQuiz(false);
    setTyping("");
    setAnswerObjButton(false);
  };

  return (
    <div className="typingContainer">
      {checkQuiz ? (
        <div>
          <h3>{quiz}</h3>
          <button className="actionButton" onClick={nextLevel}>
            다음 레벨
          </button>
        </div>
      ) : (
        <div>
          <input value={typing} onChange={changeTyping} />
          <button className="typingButton" onClick={sumbitAnswer}>
            확인
          </button>
        </div>
      )}
    </div>
  );
}

export default Typing;
