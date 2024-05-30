import React, { useState, useRef, useEffect } from 'react';

function Canvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [path, setPath] = useState([]);
  const [paths, setPaths] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function draw(e) {
      if (!isDrawing || !e.clientX || !e.clientY) return;
      const rect = canvas.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(offsetX, offsetY);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 10;
      ctx.stroke();
      setLastX(offsetX);
      setLastY(offsetY);
      setPath(prevPath => [...prevPath, { x: offsetX, y: offsetY }]);
    }

    canvas.addEventListener('mousemove', draw);

    return () => {
      canvas.removeEventListener('mousemove', draw);
    };
  }, [isDrawing, lastX, lastY]);

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const { clientX, clientY } = e;
    const rect = e.target.getBoundingClientRect();
    setLastX(clientX - rect.left);
    setLastY(clientY - rect.top);
    setPath([{ x: clientX - rect.left, y: clientY - rect.top }]);
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setPaths(prevPaths => [...prevPaths, path]);
      setPath([]);
    }
    setIsDrawing(false);
  };

  const handleMouseOut = () => {
    if (isDrawing) {
      setPaths(prevPaths => [...prevPaths, path]);
      setPath([]);
    }
    setIsDrawing(false);
  };

  const undoStroke = () => {
    setPaths(prevPaths => prevPaths.slice(0, -1));
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paths.forEach(p => {
      ctx.beginPath();
      ctx.moveTo(p[0].x, p[0].y);
      for (let i = 1; i < p.length; i++) {
        ctx.lineTo(p[i].x, p[i].y);
      }
      ctx.stroke();
    });
  };

  useEffect(redrawCanvas, [paths]);

  const saveImage = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'canvas_image.png';
    link.click();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPaths([]);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: '1px solid black' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
      />
      <br />
      <button onClick={saveImage}>저장</button>
      <button onClick={clearCanvas}>다시 쓰기</button>
      <button onClick={undoStroke}>한 획만 지우기</button>
    </div>
  );
}

export default Canvas;
