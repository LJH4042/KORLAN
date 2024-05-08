import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../css/game.css";

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

  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const [outputImageSrc, setOutputImageSrc] = useState(null);

  const [path, setPath] = useState([]);
  const [paths, setPaths] = useState([]);

  const [imgText, setImgText] = useState("");

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
      ctx.strokeStyle = "blue";
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
  }, [isDrawing, lastX, lastY]);

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
    await axios
      .post("http://localhost:5000/canvas", { dataURL: dataURL })
      .then((res) => {
        setImgText(res.data.text);
        checkAnswer(res.data.text);
      });
    console.log(outputImageSrc);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
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
    <div className="canvasContainer">
      <canvas
        ref={canvasRef}
        width={500}
        height={200}
        style={{ border: "1px solid black" }}
        onMouseDown={drawingCanvas}
        onMouseUp={stopDrawing}
        onMouseOut={canvasOut}
      />
      <div className="canvasButtonDiv">
        {checkQuiz ? (
          <div>
            <h3>
              정답: [{quiz}], 제출한 답: [{imgText}]
            </h3>
            <button onClick={nextLevel}>다음 레벨</button>
          </div>
        ) : (
          <div>
            <button onClick={outputCanvasImage}>제출</button>
            <button onClick={clearCanvas}>다시 쓰기</button>
            <button onClick={returnCurrentLine}>한 획 지우기</button>
          </div>
        )}
      </div>
      {/*outputImageSrc && <img src={outputImageSrc} alt="분석된 이미지" />*/}
    </div>
  );
}

export default Canvas;
