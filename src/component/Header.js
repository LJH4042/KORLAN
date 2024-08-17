import React, { useState, useEffect } from "react";
import "../css/Nav.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);

  // 사용자 데이터를 가져오는 함수
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    const headerData = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    try {
      const res = await axios.get("http://localhost:5000/login", headerData);
      setUserData(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        try {
          const refreshRes = await axios.post(
            "http://localhost:5000/refresh",
            {},
            { withCredentials: true }
          );
          const newToken = refreshRes.data.token;
          localStorage.setItem("token", newToken);
          headerData.headers.Authorization = `Bearer ${newToken}`;
          fetchUserData(); // 데이터를 다시 가져오기 시도
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

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        { withCredentials: true } //withCredentials 허용
      );
      localStorage.removeItem("token"); //accessToken 삭제
      navigate("/login"); //로그인 페이지로 이동
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserData();
    }
  }, []);

  return (
    <div className="header">
      <span className="teamName">중부대학교 정보보호학과</span>
      {isLoggedIn ? (
        <div>
          <span className="userId">{userData.username}님 환영합니다.</span>
          <span className="loginLeft" onClick={() => handleLogout()}>
            로그아웃
          </span>{" "}
          <span>|</span>
          <span className="loginRight" onClick={() => navigate("/mypage")}>
            마이페이지
          </span>
        </div>
      ) : (
        <div>
          <span className="loginLeft" onClick={() => navigate("/login")}>
            로그인
          </span>
          <span>|</span>
          <span className="loginRight" onClick={() => navigate("/register")}>
            회원가입
          </span>
        </div>
      )}
    </div>
  );
}

export default Header;
