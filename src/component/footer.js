import React from "react";
import "../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>또박또박</h4>
          <p>중부대학교 정보보호학과 졸업작품</p>
        </div>
        <div className="footer-section">
          <h4>팀원</h4>
          <p>박유진, 92015142</p>
          <p>신윤호, 91913646</p>
          <p>이정호, 91914042</p>
          <p>최하은, 92113906</p>
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
          </ul>
        </div>
        <div className="footer-section">
          <h4>연락처</h4>
          <p>Email: ttobakttobak@abc.com</p>
          <p>Phone: 02-1234-5678</p>
          <p>주소: 경기도 고양시 덕양구</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="bottomP_1">
          이용약관 | 개인정보처리방침 | 운영정책 | 고객센터 | 공지사항 | Q&A
        </p>
        <p className="bottomP_2">&copy; 2024 또박또박.</p>
      </div>
    </footer>
  );
};

export default Footer;
