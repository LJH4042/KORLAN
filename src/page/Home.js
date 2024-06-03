import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ControlledCarousel from "../component/Carousel/Carousels";
import Nav from "../component/Nav";

function Home() {
  const navigate = useNavigate();

  const resetGame = (link) => {
    axios.post("http://localhost:5000/game/reset");
    navigate(`/${link}`);
  };
  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div>
      <Nav />
      <div>
        <button onClick={() => navigate("/login")}>로그인</button>
        <button onClick={() => navigate("/register")}>회원가입</button>
        <button onClick={() => navigate("/post")}>커뮤니티</button>
        <button onClick={() => resetGame("imageGame")}>이미지 게임</button>
        <button onClick={() => resetGame("combineGame")}>낱말 조합</button>
        <button onClick={logout}>로그아웃</button>
        <button onClick={() => navigate("/mypage")}>마이 페이지</button>
      </div>
      <div>
        <ControlledCarousel />
      </div>
    </div>
  );
}

export default Home;
