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
          <h3>
            정답: [{quiz}], 제출한 답: [{typing}]
          </h3>
          <button onClick={nextLevel}>다음 레벨</button>
        </div>
      ) : (
        <div>
          <input value={typing} onChange={changeTyping} />
          <button onClick={sumbitAnswer}>제출</button>
        </div>
      )}
    </div>
  );
}

export default Typing;
