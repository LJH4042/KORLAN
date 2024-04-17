import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navgate = useNavigate();

  return (
    <div>
      <button onClick={() => navgate("/login")}>로그인</button>
      <button onClick={() => navgate("/register")}>회원가입</button>
      <button onClick={() => navgate("/post")}>커뮤니티</button>
      <button onClick={() => navgate("/canvas")}>캔버스</button>
      <button onClick={() => navgate("/image")}>단어 맞추기</button>
    </div>
  );
}

export default Home;
