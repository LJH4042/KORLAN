import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/MyPage.css";
import profileImage from "../../img/profile.png";

function MyPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [selectedContent, setSelectedContent] = useState("내 정보");
  const [loading, setLoading] = useState(true);

  // 사용자 데이터를 가져오는 함수
  const fetchUserData = async () => {
    setLoading(true);
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
          navigate("/login");
        }
      } else {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
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
    if (loading) return <div className="loading">💖잠시만 기다려 주세요💖</div>; // 로딩 상태 표시
    if (!userData) return null;

    switch (selectedContent) {
      case "내 정보":
        return <UserInfo userData={userData} navigate={navigate} />;
      case "도장판":
        return <StampBoard userData={userData} />;
      case "학습 진행률":
        return (
          <LearningProgress
            learnCon={userData.learnPoint.consonant.length}
            learnVow={userData.learnPoint.vowel.length}
            learnDouCon={userData.learnPoint.doubleConsonant.length}
            learnDouVow={userData.learnPoint.doubleVowel.length}
          />
        );
      case "오답 앨범":
        return <WrongAnswerAlbum userData={userData} />;
      default:
        return null;
    }
  };

  return (
    <div className="container pullDown">
      <div>
        <h1>마이페이지</h1>
        <a href="#info" onClick={() => handleLinkClick("내 정보")}>
          내 정보
        </a>
        <a href="#stamp" onClick={() => handleLinkClick("도장판")}>
          도장판
        </a>
        <a href="#learn" onClick={() => handleLinkClick("학습 진행률")}>
          학습 진행률
        </a>
        <a href="#album" onClick={() => handleLinkClick("오답 앨범")}>
          오답 앨범
        </a>
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
  const username = userData.username;
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
        await axios
          .post(
            "http://localhost:5000/delete-account",
            { username: username },
            headerData
          )
          .then((res) => alert(res.data.message));
        localStorage.removeItem("token");
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="user-info">
      <img
        src={
          userData.profileImage
            ? `/images/${userData.profileImage}`
            : profileImage
        }
        alt="Profile"
        className="profile-picture"
      />
      <h2>{userData.username}</h2>
      <p>이메일: {userData.email}</p>
      <p>계정 생성일: {userData.creationDate}</p>
      <p>마지막 로그인: {userData.lastLogin}</p>
      <button onClick={handleDeleteAccount}>탈퇴하기</button>
    </div>
  );
}

function StampBoard({ userData }) {
  const imageLowStamps = Math.min(userData.imageScore.low, 10);
  const imageMiddleStamps = Math.min(userData.imageScore.middle, 10);
  const imageHighStamps = Math.min(userData.imageScore.high, 10);
  const combineLowStamps = Math.min(userData.combineScore.low, 10);
  const combineMiddleStamps = Math.min(userData.combineScore.middle, 10);
  const combineHighStamps = Math.min(userData.combineScore.high, 10);

  const i_StampsLow = Array(10)
    .fill(false)
    .map((_, index) => index < imageLowStamps);
  const i_StampsMiddle = Array(10)
    .fill(false)
    .map((_, index) => index < imageMiddleStamps);
  const i_StampsHigh = Array(10)
    .fill(false)
    .map((_, index) => index < imageHighStamps);
  const c_StampsLow = Array(10)
    .fill(false)
    .map((_, index) => index < combineLowStamps);
  const c_StampsMiddle = Array(10)
    .fill(false)
    .map((_, index) => index < combineMiddleStamps);
  const c_StampsHigh = Array(10)
    .fill(false)
    .map((_, index) => index < combineHighStamps);

    return (
      <div className="stamp-board-container">
        <div className="stamp-board">
          <h3>이미지 게임</h3>
          <div className="stamp-row">
            <p>하</p>
            {i_StampsLow.map((stamped, index) => (
              <div key={index} className={`stamp ${stamped ? "stamped" : ""}`}>
                {stamped ? "🌞" : "⬜"}
              </div>
            ))}
          </div>
          <div className="stamp-row">
            <p>중</p>
            {i_StampsMiddle.map((stamped, index) => (
              <div key={index} className={`stamp ${stamped ? "stamped" : ""}`}>
                {stamped ? "🌞" : "⬜"}
              </div>
            ))}
          </div>
          <div className="stamp-row">
            <p>상</p>
            {i_StampsHigh.map((stamped, index) => (
              <div key={index} className={`stamp ${stamped ? "stamped" : ""}`}>
                {stamped ? "🌞" : "⬜"}
              </div>
            ))}
          </div>
        </div>
        <div className="stamp-board">
          <h3>조합 게임</h3>
          <div className="stamp-row">
            <p>하</p>
            {c_StampsLow.map((stamped, index) => (
              <div
                key={index}
                className={`stamp ${stamped ? "stamped-secondary" : ""}`}
              >
                {stamped ? "🌟" : "⬜"}
              </div>
            ))}
          </div>
          <div className="stamp-row">
            <p>중</p>
            {c_StampsMiddle.map((stamped, index) => (
              <div
                key={index}
                className={`stamp ${stamped ? "stamped-secondary" : ""}`}
              >
                {stamped ? "🌟" : "⬜"}
              </div>
            ))}
          </div>
          <div className="stamp-row">
            <p>상</p>
            {c_StampsHigh.map((stamped, index) => (
              <div
                key={index}
                className={`stamp ${stamped ? "stamped-secondary" : ""}`}
              >
                {stamped ? "🌟" : "⬜"}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

function LearningProgress({ learnCon, learnVow, learnDouCon, learnDouVow }) {
  return (
    <div>
      <p>자음 학습하기 ({learnCon} / 98)</p>
      <div className="bar-graph">
        <div className="bar" style={{ width: `${(learnCon / 98) * 100}%` }}>
          <span className="bar-text">{`${Math.floor(
            (learnCon / 98) * 100
          )}%`}</span>
        </div>
      </div>
      <p>모음 학습하기 ({learnVow} / 60)</p>
      <div className="bar-graph">
        <div className="bar" style={{ width: `${(learnVow / 60) * 100}%` }}>
          <span className="bar-text">{`${Math.floor(
            (learnVow / 60) * 100
          )}%`}</span>
        </div>
      </div>
      <p>쌍자음 학습하기 ({learnDouCon} / 25)</p>
      <div className="bar-graph">
        <div className="bar" style={{ width: `${(learnDouCon / 25) * 100}%` }}>
          <span className="bar-text">{`${Math.floor(
            (learnDouCon / 25) * 100
          )}%`}</span>
        </div>
      </div>
      <p>쌍모음 학습하기 ({learnDouVow} / 62)</p>
      <div className="bar-graph">
        <div className="bar" style={{ width: `${(learnDouVow / 62) * 100}%` }}>
          <span className="bar-text">{`${Math.floor(
            (learnDouVow / 62) * 100
          )}%`}</span>
        </div>
      </div>
    </div>
  );
}

function WrongAnswerAlbum({ userData }) {
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWrongAnswers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/wrong-answers",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWrongAnswers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching wrong answers:", err);
        setError("오답을 불러오는 데 실패했습니다." + err.message);
        setLoading(false);
      }
    };

    fetchWrongAnswers();
  }, []);

  if (loading) return <div className="loading">💖잠시만 기다려 주세요💖</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="wrong-answer-album">
      <h2>{userData.username}님의 오답 앨범</h2>
      {wrongAnswers.length === 0 ? (
        <p>아직 오답이 없습니다.</p>
      ) : (
        <ul className="wrong-answer-list">
          {wrongAnswers.map((answer, index) => (
            <li key={index} className="wrong-answer-item">
              <h3>문제: {answer.question}</h3>
              <p className="given-answer">내가 쓴 답: {answer.givenAnswer}</p>
              <p className="correct-answer">정답: {answer.correctAnswer}</p>
              <p className="timestamp">
                풀이날짜: {new Date(answer.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyPage;
