import React, { useEffect, useRef, useState } from "react";
import "../css/notebook.css";

function Notebook({
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
  const [path, setPath] = useState([]);
  const [paths, setPaths] = useState([]);

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

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  };

  return (
    <div className="notebookContainer">
      <h1 className="notebookTitle">연습장</h1>
      <p className="notebookDescription"></p>
      <div className="canvasWrapper">
        <canvas
          ref={canvasRef}
          width={750}
          height={300}
          className="canvas"
          onMouseDown={drawingCanvas}
          onMouseUp={stopDrawing}
          onMouseOut={canvasOut}
        />
      </div>
      <div className="canvasButtonDiv">
        <button
          className="colorButton"
          style={{ backgroundColor: "gray" }}
          onClick={() => setColor("gray")}
        />
        <button
          className="colorButton"
          style={{ backgroundColor: "blue" }}
          onClick={() => setColor("blue")}
        />
        <button
          className="colorButton"
          style={{ backgroundColor: "red" }}
          onClick={() => setColor("red")}
        />
        <button
          className="colorButton"
          style={{ backgroundColor: "green" }}
          onClick={() => setColor("green")}
        />
        <button
          className="colorButton"
          style={{ backgroundColor: "purple" }}
          onClick={() => setColor("purple")}
        />
      </div>
      <div className="canvasButtonDiv">
        {checkQuiz ? (
          <div>
            <h3>정답: {quiz}</h3>
            <button className="actionButton" onClick={nextLevel}>
              다음 레벨
            </button>
          </div>
        ) : (
          <div>
            <button className="actionButton" onClick={clearCanvas}>
              모두 지우기
            </button>
            <button className="actionButton" onClick={returnCurrentLine}>
              이전으로
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notebook;
