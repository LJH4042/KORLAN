import React from "react";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>또박또박</h4>
          <p>중부대학교 정보호호학전공 - 박유진 신윤호 이정호 최하은</p>
        </div>
        <div className="footer-section">
          <h4>사이트 맵</h4>
          <ul>
            <li>
              <a href="/">홈</a>
            </li>
            <li>
              <a href="/introduce">소개</a>
            </li>
            <li>
              <a href="/learn">학습하기</a>
            </li>
            <li>
              <a href="/imageGame">이미지 게임</a>
            </li>
            <li>
              <a href="/combineGame">낱말 조합</a>
            </li>
            <li>
              <a href="/notebook">연습장</a>
            </li>
            <li>
              <a href="/teamIntro">개발팀</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 또박또박.</p>
      </div>
    </footer>
  );
};

export default Footer;
