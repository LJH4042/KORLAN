import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './MyPage.css';

function MyPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [selectedContent, setSelectedContent] = useState(null);
  const [imageScore, setImageScore] = useState(0); // 이미지 게임 점수 추가
  const [combineScore, setCombineScore] = useState(0); // 조합 게임 점수 추가

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
      setImageScore(res.data.imageScore); // 이미지 게임 점수 설정
      setCombineScore(res.data.combineScore); // 조합 게임 점수 설정
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

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  // 링크 클릭 핸들러
  const handleLinkClick = (content) => {
    setSelectedContent(content);
  };

  // 선택된 컨텐츠에 따라 보여줄 컴포넌트를 리턴
  const getContentComponent = () => {
    switch (selectedContent) {
      case "내 정보":
        return <UserInfo userData={userData} navigate={navigate} />;
      case "도장판":
        return <StampBoard imageScore={imageScore} combineScore={combineScore} />;
      case "학습 진행률":
        return <LearningProgress userData={userData} imageScore={imageScore} />;
      case "오답 앨범":
        return <WrongAnswerAlbum />;
      default:
        return null;
    }
  };

  return (
    <div className="container pullDown">
      <div>
        <h1>마이페이지</h1>
        <a href="#" onClick={() => handleLinkClick('내 정보')}>내 정보</a>
        <a href="#" onClick={() => handleLinkClick('도장판')}>도장판</a>
        <a href="#" onClick={() => handleLinkClick('학습 진행률')}>학습 진행률</a>
        <a href="#" onClick={() => handleLinkClick('오답 앨범')}>오답 앨범</a>
      </div>
      <div className="divider"></div>
      {selectedContent && (
        <div className="content">
          {/* 선택된 컨텐츠에 따라 다른 컴포넌트를 보여줌 */}
          {getContentComponent()}
        </div>
      )}
    </div>
  );
}

function UserInfo({ userData, navigate }) {
  const handleDeleteAccount = async () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      const token = localStorage.getItem("token");
      const headerData = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      try {
        await axios.delete("http://localhost:5000/delete-account", headerData);
        localStorage.removeItem("token");
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <p>이름: {userData.username}</p>
      <p>이메일: {userData.email}</p>
      <button onClick={handleDeleteAccount}>탈퇴하기</button>
    </div>
  );
}

function StampBoard({ imageScore, combineScore }) {
  const primaryStamps = Math.min(imageScore, 10);
  const secondaryStamps = Math.min(combineScore, 10);

  const stamps = Array(10).fill(false).map((_, index) => index < primaryStamps);
  const secondaryStampsArray = Array(10).fill(false).map((_, index) => index < secondaryStamps);

  return (
    <div className="stamp-board-container">
      <div className="stamp-board">
        <p>이미지 게임</p>
        {stamps.map((stamped, index) => (
          <div key={index} className={`stamp ${stamped ? 'stamped' : ''}`}>
            {stamped ? '🌞' : '⬜'}
          </div>
        ))}
      </div>
      <div className="stamp-board">
        <p>조합 게임</p>
        {secondaryStampsArray.map((stamped, index) => (
          <div key={index} className={`stamp ${stamped ? 'stamped-secondary' : ''}`}>
            {stamped ? '🌟' : '⬜'}
          </div>
        ))}
      </div>
    </div>
  );
}

function LearningProgress({ userData, imageScore }) {
  return (
    <div>
      <p>자음 학습하기</p>
      <div className="bar-graph">
        <div className="bar" style={{ width: `${imageScore}%` }}>
          <span className="bar-text">{`${imageScore}%`}</span>
        </div>
      </div>
      <p>모음 학습하기</p>
      <div className="bar-graph">
        <div className="bar" style={{ width: `${userData.combineScore}%` }}>
          <span className="bar-text">{`${userData.combineScore}%`}</span>
        </div>
      </div>
      <p>쌍자음 학습하기</p>
      <div className="bar-graph">
        <div className="bar" style={{ width: `${imageScore}%` }}>
          <span className="bar-text">{`${imageScore}%`}</span>
        </div>
      </div>
      <p>쌍모음 학습하기</p>
      <div className="bar-graph">
        <div className="bar" style={{ width: `${userData.combineScore}%` }}>
          <span className="bar-text">{`${userData.combineScore}%`}</span>
        </div>
      </div>
    </div>
  );
}

function WrongAnswerAlbum() {
  return <div>오답 앨범 페이지</div>;
}

export default MyPage;
