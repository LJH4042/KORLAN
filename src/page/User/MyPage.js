import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

  // 사용자의 학습 진행 상황을 추적하는 상태 변수
  const [progress, setProgress] = useState(0);

  // 보상 시스템을 위한 상태 변수
  const [rewards, setRewards] = useState(0);

  // 진행 상황 업데이트 함수
  const updateProgress = (increment) => {
    setProgress(progress + increment);
  };

  const logout = () => {
    navigate("/");
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
    if (localStorage.getItem("token") === null) {
      //navigate("/login");
    } else {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <div>
      {/* <div>
        <button onClick={() => navigate("/")}>홈</button>
        <button onClick={logout}>로그아웃</button>
      </div> */}
      <h1>마이페이지</h1>
      <div>
        <h1>유저 이름 : {userData.username}</h1>
        <h1>이미지 게임 점수 : {userData.imageScore}</h1>
        <h1>조합 게임 점수 : {userData.combineScore}</h1>
      </div>
      <div>
        <p>진행 상황: {progress}</p>
        <p>보상 포인트: {rewards}</p>
      </div>
    </div>
  );
}

export default MyPage;
