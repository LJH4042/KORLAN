import React from 'react';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h5>또박또박</h5>
          <p>중부대학교 정보호호학전공 졸업 작품 - 박유진 신윤호 이정호 최하은
          </p>
        </div>
        {/* 사이트 맵 */}
        <div className="footer-section">
          <h5>사이트 맵</h5>
          <ul>
            <li><a href="/">홈</a></li>
            <li><a href="/introduce">소개</a></li>
            <li><a href="/introduce">학습하기</a></li>
            <li><a href="/game">게임하기</a></li>
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
