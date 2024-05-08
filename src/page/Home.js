import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navgate = useNavigate();
  const [scoreData, setScoreData] = useState([]);

  const resetImage = () => {
    axios.post("http://localhost:5000/game/reset");
    navgate("/imageGame");
  };
  const resetText = () => {
    axios.post("http://localhost:5000/game/reset");
    navgate("/combineGame");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/score")
      .then((res) => setScoreData(res.data[0]));
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => navgate("/login")}>로그인</button>
        <button onClick={() => navgate("/register")}>회원가입</button>
        <button onClick={() => navgate("/post")}>커뮤니티</button>
        <button onClick={resetImage}>이미지 게임</button>
        <button onClick={resetText}>낱말 조합</button>
      </div>
      <div>
        <h1>이미지 게임 점수 : {scoreData.imageScore}</h1>
        <h1>조합 게임 점수 : {scoreData.combineScore}</h1>
      </div>
    </div>
  );
}

export default Home;
