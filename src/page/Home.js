import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ControlledCarousel from "../component/Carousel/Carousels";
import Nav from "../component/Nav";

function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  const resetImage = () => {
    axios.post("http://localhost:5000/game/reset");
    navigate("/imageGame");
  };
  const resetText = () => {
    axios.post("http://localhost:5000/game/reset");
    navigate("/combineGame");
  };
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    const headerData = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.get("http://localhost:5000/login", headerData).then((res) => {
        setUserData(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* <Nav /> */}
      {/* <div>
        <button onClick={() => navigate("/login")}>로그인</button>
        <button onClick={() => navigate("/register")}>회원가입</button>
        <button onClick={() => navigate("/post")}>커뮤니티</button>
        <button onClick={resetImage}>이미지 게임</button>
        <button onClick={resetText}>낱말 조합</button>
        <button onClick={logout}>로그아웃</button>
        <button onClick={() => navigate("/mypage")}>마이 페이지</button>
      </div>
      <div>
        <h1>유저 이름 : {userData.username}</h1>
        <h1>이미지 게임 점수 : {userData.imageScore}</h1>
        <h1>조합 게임 점수 : {userData.combineScore}</h1>
      </div> */}
      <div>
        <ControlledCarousel />
      </div>
    </div>
  );
}

export default Home;
