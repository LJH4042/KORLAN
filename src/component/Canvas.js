import React, { useEffect, useRef, useState, useImperativeHandle } from "react";
import axios from "axios";

function Canvas(
  { checkAnswer, fetchData, quiz, checkQuiz, setCheckQuiz, setAnswerObjButton },
  ref
) {
  const canvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("gray");
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [outputImageSrc, setOutputImageSrc] = useState(null);
  const [path, setPath] = useState([]);
  const [paths, setPaths] = useState([]);
  const [imgText, setImgText] = useState("");

  useImperativeHandle(ref, () => ({
    clearCanvas,
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
    if (paths.length === 0 && path.length === 0) {
      alert("단어를 써주세요.");
      return;
    }
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    try {
      const res = await axios.post("http://localhost:5000/canvas", {
        dataURL: dataURL,
      });
      if (!res.data.text) {
        alert("옳바른 단어가 아닙니다. 다시 써주세요.");
        setTimeout(() => {
          clearCanvas();
        }, 100);
        return;
      }
      setImgText(res.data.text);
      const isCorrect = checkAnswer(res.data.text);
      if (!isCorrect) {
        const newWrongAnswer = {
          question: quiz,
          givenAnswer: res.data.text,
          correctAnswer: quiz,
        };
        await saveWrongAnswer(newWrongAnswer);
      }
    } catch (error) {
      console.error("Error processing canvas image:", error);
    }
    clearCanvas();
  };

  const saveWrongAnswer = async (wrongAnswer) => {
    if (localStorage.getItem("token") === null) return;
    try {
      await axios.post("http://localhost:5000/api/wrong-answers", wrongAnswer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error saving wrong answer:", error);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setOutputImageSrc(null);
    setPaths([]);
    setImgText("");
  };

  const returnCurrentLine = () => {
    setPaths((prevPaths) => prevPaths.slice(0, -1));
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
    setPaths([]);
  };

  return (
    <div className="canvasContainer">
      {checkQuiz ? (
        <div className="canvasButtonDiv">
          <h3>{quiz}</h3>
          <button className="actionButton" onClick={nextLevel}>
            다음 레벨
          </button>
        </div>
      ) : (
        <div>
          <div>
            <p style={{ textAlign: "center", color: "gray" }}>
              -최대한 또박또박 바르게 써주세요.-
            </p>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default React.forwardRef(Canvas);
