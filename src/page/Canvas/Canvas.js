import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../css/canvas.css";

function Canvas() {
  const canvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false); //선을 그리고 있는 지 여부를 지정

  const [lastX, setLastX] = useState(0); //선의 마지막 x좌표를 지정
  const [lastY, setLastY] = useState(0); //선의 마지막 y좌표를 지정

  const [outputImageSrc, setOutputImageSrc] = useState(null); // 이미지 src 변수

  const [path, setPath] = useState([]); //현재 그리는 선의 좌표들을 저장하는 배열.
  const [paths, setPaths] = useState([]); //그려진 모든 선들의 좌표들을(path들의 집합) 저장하는 배열.

  const [imgText, setImgText] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current; //캔버스를 지정
    const ctx = canvas.getContext("2d"); //2d 형식의 드로잉 컨텍스트를 받아옴

    const drawing = (e) => {
      if (!isDrawing) return; //선을 그리는 상태가 아닐때, 마우스를 클릭한 상태가 아니면 반환

      const rect = canvas.getBoundingClientRect(); //캔버스 내에서 좌표를 가져옴
      const offsetX = e.clientX - rect.left; //캔버스 내에서 마우스 커서의 x좌표
      const offsetY = e.clientY - rect.top; //캔버스 내에서 마우스 커서의 y좌표
      //offsetX는 마우스 이벤트가 발생한 X 좌표(e.clientX)에서
      //canvas 요소의 왼쪽 경계(rect.left)를 뺀 값으로, 캔버스 내에서의 X 좌표를 나타냄.
      //offsetY는 마우스 이벤트가 발생한 Y 좌표(e.clientY)에서
      //canvas 요소의 위쪽 경계(rect.top)를 뺀 값으로, 캔버스 내에서의 Y 좌표를 나타냄.

      ctx.beginPath(); //새로운 선을 생성
      ctx.moveTo(lastX, lastY); //lastX, lastY를 선의 시작점을 설정
      ctx.lineTo(offsetX, offsetY); //offsetX, offsetY까지 선을 그림
      ctx.strokeStyle = "gray"; //선의 색상을 검은색으로 지정
      ctx.lineWidth = 2; //선의 굵기를 2픽셀로 지정
      ctx.stroke(); //실제 선을 그려줌

      setLastX(offsetX); //다음 선을 그릴 때 offserX로 시작점을 업데이트
      setLastY(offsetY); //다음 선을 그릴 때 offserY로 시작점을 업데이트
      //moveTo()로 이전 선의 끝점을 설정하고, lineTo()로 새로운 선을 그리고,
      //그리기 옵션(strokeStyle, lineWidth)을 설정한 후 stroke() 메서드로 선을 실제로 그림.
      //그린 선의 끝점을 새로운 시작점으로 설정하여 다음 선을 그릴 때 이어지도록 함.

      setPath((prevPath) => [...prevPath, { x: offsetX, y: offsetY }]); //x, y 좌표를 배열에 저장
    };

    canvas.addEventListener("mousemove", drawing); //마우스를 움직일 때 draw 함수 실행

    return () => {
      //캔버스 그리기 이외의 상황일 경우 이벤트 리스너 제거
      canvas.removeEventListener("mousemove", drawing);
    };
  }, [isDrawing, lastX, lastY]);

  //선을 그리는 함수
  const drawingCanvas = (e) => {
    setIsDrawing(true);
    const rect = e.target.getBoundingClientRect();
    setLastX(e.clientX - rect.left);
    setLastY(e.clientY - rect.top);
    setPath([{ x: e.clientX - rect.left, y: e.clientY - rect.top }]); //캔버스 내 마우스 커서의 좌표를 배열에 저장
  };

  //선 그리기를 멈추는 함수
  const stopDrawing = () => {
    if (isDrawing) {
      setPaths((prevPaths) => [...prevPaths, path]); //path 좌표들을 하나로 모아 집합으로 저장
      setPath([]); //path 배열 초기화
    }
    setIsDrawing(false);
  };

  //캔버스 밖으로 나갔을 시 선 그리기를 멈추는 함수
  const canvasOut = () => {
    setIsDrawing(false);
  };

  //캔버스를 이미지로 추출하는 함수
  const outputCanvas = async () => {
    const canvas = canvasRef.current;
    setOutputImageSrc(canvas.toDataURL());

    const dataURL = canvas.toDataURL("image/png");
    await axios
      .post("http://localhost:5000/canvas", { dataURL: dataURL })
      .then((res) => {
        setImgText(res.data.text);
      });
  };
  //캔버스 그림을 문자열로 변환한 뒤 outputImageSrc 값으로 지정
  //outputImageSrc <img> 태그의 src 값으로 넣어서 이미지로 추출

  //다시 쓰기 함수
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); //캔버스 전체 영역을 지움
    setOutputImageSrc(null); //추출한 이미지도 삭제
    setPaths([]);
    setImgText("");
  };

  //한 획 지우기 함수
  const returnCanvas = () => {
    setPaths((prevPaths) => prevPaths.slice(0, -1)); //가장 최근 선 한 개를 삭제
  };

  //선 하나 삭제 시 paths 배열에 저장된 선들을 다시 그려서 캔버스에 복구
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paths.forEach((p) => {
      //paths 배열을 순회하면서 배열에 남아있는 선(p)을 다시 캔버스에 보여줌
      ctx.beginPath(); //새로운 선을 그릴 경로 시작
      ctx.moveTo(p[0].x, p[0].y); //현재 경로의 시작점을 설정
      for (let i = 1; i < p.length; i++) {
        //좌표들을 순회하면서 선을 그림
        ctx.lineTo(p[i].x, p[i].y);
      }
      ctx.stroke(); //실제 선을 그려서 새로운 선을 추가
    });
  };
  //paths 배열에 저장된 모든 선들을 캔버스에 다시 그려주는 역할을 수행
  //선이 추가되거나 삭제될 때 캔버스를 업데이트하고 다시 렌더링하는 데 사용

  useEffect(redrawCanvas, [paths]); //렌더링 될 때마다 redrawCanvas 실행

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: "1px solid black" }}
        onMouseDown={drawingCanvas}
        onMouseUp={stopDrawing}
        onMouseOut={canvasOut}
      />
      {outputImageSrc && <img src={outputImageSrc} alt="분석된 이미지" />}
      <div>
        <button onClick={outputCanvas}>추출</button>
        <button onClick={clearCanvas}>다시 쓰기</button>
        <button onClick={returnCanvas}>한 획 지우기</button>
      </div>
      <div>
        <h1>{imgText}</h1>
      </div>
    </div>
  );
}

export default Canvas;
