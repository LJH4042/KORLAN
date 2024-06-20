import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/MyPage.css";

function MyPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [selectedContent, setSelectedContent] = useState(null);
  const [imageLow, setImageLow] = useState(0);
  const [imageMiddle, setImageMiddle] = useState(0);
  const [imageHigh, setImageHigh] = useState(0);
  const [combineLow, setCombineLow] = useState(0);
  const [combineMiddle, setCombineMiddle] = useState(0);
  const [combineHigh, setCombineHigh] = useState(0);
  const [learnCon, setLearnCon] = useState([]);
  const [learnVow, setLearnVow] = useState([]);
  const [learnDouCon, setLearnDouCon] = useState([]);
  const [learnDouVow, setLearnDouVow] = useState([]);

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
      setImageLow(res.data.imageScore.low);
      setImageMiddle(res.data.imageScore.middle);
      setImageHigh(res.data.imageScore.high);
      setCombineLow(res.data.combineScore.low);
      setCombineMiddle(res.data.combineScore.middle);
      setCombineHigh(res.data.combineScore.high);
      setLearnCon(res.data.learnPoint.consonant);
      setLearnVow(res.data.learnPoint.vowel);
      setLearnDouCon(res.data.learnPoint.doubleConsonant);
      setLearnDouVow(res.data.learnPoint.doubleVowel);
    } catch (err) {
      console.error(err);
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
        return (
          <StampBoard
            imageLow={imageLow}
            imageMiddle={imageMiddle}
            imageHigh={imageHigh}
            combineLow={combineLow}
            combineMiddle={combineMiddle}
            combineHigh={combineHigh}
          />
        );
      case "학습 진행률":
        return (
          <LearningProgress
            learnCon={learnCon.length}
            learnVow={learnVow.length}
            learnDouCon={learnDouCon.length}
            learnDouVow={learnDouVow.length}
          />
        );
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
    <div>
      <p>이름: {userData.username}</p>
      <p>이메일: {userData.email}</p>
      <button onClick={handleDeleteAccount}>탈퇴하기</button>
    </div>
  );
}

function StampBoard({
  imageLow,
  imageMiddle,
  imageHigh,
  combineLow,
  combineMiddle,
  combineHigh,
}) {
  const imageLowStamps = Math.min(imageLow, 10);
  const imageMiddleStamps = Math.min(imageMiddle, 10);
  const imageHighStamps = Math.min(imageHigh, 10);
  const combineLowStamps = Math.min(combineLow, 10);
  const combineMiddleStamps = Math.min(combineMiddle, 10);
  const combineHighStamps = Math.min(combineHigh, 10);

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
        <p>이미지 게임</p>
        <p>(하)</p>
        {i_StampsLow.map((stamped, index) => (
          <div key={index} className={`stamp ${stamped ? "stamped" : ""}`}>
            {stamped ? "🌞" : "⬜"}
          </div>
        ))}
        <p>(중)</p>
        {i_StampsMiddle.map((stamped, index) => (
          <div key={index} className={`stamp ${stamped ? "stamped" : ""}`}>
            {stamped ? "🌞" : "⬜"}
          </div>
        ))}
        <p>(상)</p>
        {i_StampsHigh.map((stamped, index) => (
          <div key={index} className={`stamp ${stamped ? "stamped" : ""}`}>
            {stamped ? "🌞" : "⬜"}
          </div>
        ))}
      </div>
      <div className="stamp-board">
        <p>조합 게임</p>
        <p>(하)</p>
        {c_StampsLow.map((stamped, index) => (
          <div
            key={index}
            className={`stamp ${stamped ? "stamped-secondary" : ""}`}
          >
            {stamped ? "🌟" : "⬜"}
          </div>
        ))}
        <p>(중)</p>
        {c_StampsMiddle.map((stamped, index) => (
          <div
            key={index}
            className={`stamp ${stamped ? "stamped-secondary" : ""}`}
          >
            {stamped ? "🌟" : "⬜"}
          </div>
        ))}
        <p>(상)</p>
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
  );
}

function LearningProgress({ learnCon, learnVow, learnDouCon, learnDouVow }) {
  return (
    <div>
      <p>자음 학습하기 ({learnCon} / 90)</p>
      <div className="bar-graph">
        <div className="bar" style={{ width: `${(learnCon / 90) * 100}%` }}>
          <span className="bar-text">{`${Math.floor(
            (learnCon / 90) * 100
          )}%`}</span>
        </div>
      </div>
      <p>모음 학습하기 ({learnVow} / 50)</p>
      <div className="bar-graph">
        <div className="bar" style={{ width: `${(learnVow / 50) * 100}%` }}>
          <span className="bar-text">{`${Math.floor(
            (learnVow / 50) * 100
          )}%`}</span>
        </div>
      </div>
      <p>쌍자음 학습하기 ({learnDouCon} / 26)</p>
      <div className="bar-graph">
        <div className="bar" style={{ width: `${(learnDouCon / 26) * 100}%` }}>
          <span className="bar-text">{`${Math.floor(
            (learnDouCon / 26) * 100
          )}%`}</span>
        </div>
      </div>
      <p>쌍모음 학습하기 ({learnDouVow} / 37)</p>
      <div className="bar-graph">
        <div className="bar" style={{ width: `${(learnDouVow / 37) * 100}%` }}>
          <span className="bar-text">{`${Math.floor(
            (learnDouVow / 37) * 100
          )}%`}</span>
        </div>
      </div>
    </div>
  );
}

function WrongAnswerAlbum() {
  return <div>오답 앨범 페이지</div>;
}

export default MyPage;
