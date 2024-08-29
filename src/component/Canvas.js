import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Canvas({
  checkAnswer,
  fetchData,
  quiz,
  checkQuiz,
  setCheckQuiz,
  setAnswerObjButton,
}) {
  const canvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("gray");
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [outputImageSrc, setOutputImageSrc] = useState(null);
  const [path, setPath] = useState([]);
  const [paths, setPaths] = useState([]);
  const [imgText, setImgText] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const drawing = (e) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(offsetX, offsetY);
      ctx.strokeStyle = color;
      ctx.lineWidth = 10;
      ctx.stroke();
      setLastX(offsetX);
      setLastY(offsetY);
      setPath((prevPath) => [...prevPath, { x: offsetX, y: offsetY }]);
    };
    canvas.addEventListener("mousemove", drawing);
    return () => {
      canvas.removeEventListener("mousemove", drawing);
    };
  }, [isDrawing, lastX, lastY, color]);

  const drawingCanvas = (e) => {
    setIsDrawing(true);
    const rect = e.target.getBoundingClientRect();
    setLastX(e.clientX - rect.left);
    setLastY(e.clientY - rect.top);
    setPath([{ x: e.clientX - rect.left, y: e.clientY - rect.top }]);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setPaths((prevPaths) => [...prevPaths, path]);
      setPath([]);
    }
    setIsDrawing(false);
  };

  const canvasOut = () => {
    setIsDrawing(false);
  };

  const outputCanvasImage = async () => {
    const canvas = canvasRef.current;
    setOutputImageSrc(canvas.toDataURL());
    const dataURL = canvas.toDataURL("image/png");
    try {
      const res = await axios.post("http://localhost:5000/canvas", {
        dataURL: dataURL,
      });
      setImgText(res.data.text);
      const isCorrect = checkAnswer(res.data.text);
      if (!isCorrect) {
        // 오답인 경우 wrongAnswers 배열에 추가
        const newWrongAnswer = {
          question: quiz,
          givenAnswer: res.data.text,
          correctAnswer: quiz,
          timestamp: new Date(),
        };
        setWrongAnswers((prevWrongAnswers) => [
          ...prevWrongAnswers,
          newWrongAnswer,
        ]);

        // 서버에 오답 정보 저장
        await saveWrongAnswer(newWrongAnswer);
      }
    } catch (error) {
      console.error("Error processing canvas image:", error);
    }
    console.log(outputImageSrc);
    clearCanvas();
  };

  const saveWrongAnswer = async (wrongAnswer) => {
    try {
      await axios.post("http://localhost:5000/api/wrong-answers", wrongAnswer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Error saving wrong answer:", error);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setOutputImageSrc(null);
    setPaths([]);
  };

  const returnCurrentLine = () => {
    setPaths((prevPaths) => prevPaths.slice(0, -1));
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paths.forEach((p) => {
      ctx.beginPath();
      ctx.moveTo(p[0].x, p[0].y);
      for (let i = 1; i < p.length; i++) {
        ctx.lineTo(p[i].x, p[i].y);
      }
      ctx.stroke();
    });
  };

  useEffect(redrawCanvas, [paths]);

  const nextLevel = () => {
    fetchData();
    clearCanvas();
    setCheckQuiz(false);
    setAnswerObjButton(false);
    setImgText("");
  };

  return (
    <div className="canvasContainer">
      <div>
        <canvas
          ref={canvasRef}
          width={750}
          height={300}
          style={{
            border: "5px solid #a0cbe7",
            borderRadius: "10%",
          }}
          onMouseDown={drawingCanvas}
          onMouseUp={stopDrawing}
          onMouseOut={canvasOut}
        />
      </div>
      <div className="canvasButtonDiv">
        <button
          style={{ backgroundColor: "gray", padding: "15px" }}
          onClick={() => setColor("gray")}
        />
        <button
          style={{ backgroundColor: "blue", padding: "15px" }}
          onClick={() => setColor("blue")}
        />
        <button
          style={{ backgroundColor: "red", padding: "15px" }}
          onClick={() => setColor("red")}
        />
        <button
          style={{ backgroundColor: "green", padding: "15px" }}
          onClick={() => setColor("green")}
        />
        <button
          style={{ backgroundColor: "purple", padding: "15px" }}
          onClick={() => setColor("purple")}
        />
      </div>
      <div className="canvasButtonDiv">
        {checkQuiz ? (
          <div>
            <h3>
              정답: {quiz}, 제출한 답: {imgText}
            </h3>
            <button onClick={nextLevel}>다음 레벨</button>
          </div>
        ) : (
          <div>
            <button className="actionButton" onClick={outputCanvasImage}>
              확인
            </button>
            <button className="actionButton" onClick={clearCanvas}>
              다시 쓰기
            </button>
            <button className="actionButton" onClick={returnCurrentLine}>
              한 획 지우기
            </button>
          </div>
        )}
      </div>
      {/*outputImageSrc && <img src={outputImageSrc} alt="분석된 이미지" />*/}
    </div>
  );
}

export default Canvas;
