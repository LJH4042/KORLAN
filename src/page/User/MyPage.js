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

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const headerData = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    try {
      await axios.get("http://localhost:5000/login", headerData).then((res) => {
        setUserData(res.data);
      });
    } catch (err) {
      if (err.response.status === 401) {
        try {
          const refreshRes = await axios.post(
            "http://localhost:5000/refresh",
            {},
            { withCredentials: true }
          );
          const newToken = refreshRes.data.token;
          localStorage.setItem("token", newToken);
          axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          fetchUserData();
        } catch (err) {
          console.error(err);
          localStorage.removeItem("token");
        }
      } else {
        console.error(err);
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) navigate("/login");
    else fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <div>
      <button onClick={logout}>로그아웃</button>
      <h1>마이페이지</h1>
      <div>
        <h1>유저 이름 : {userData.username}</h1>
        <h1>
          이미지 게임 점수 :{" "}
          {userData.imageScoreLow +
            userData.imageScoreMiddle +
            userData.imageScoreHigh}
        </h1>
        <h1>
          낱말 조합 점수 :{" "}
          {userData.combineScoreLow +
            userData.combineScoreMiddle +
            userData.combineScoreHigh}
        </h1>
        <h1>진행 상황: {progress}</h1>
        <h1>보상 포인트: {rewards}</h1>
      </div>
    </div>
  );
}

export default MyPage;
