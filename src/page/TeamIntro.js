import React from "react";
import "../css/introduce.css";
import image1 from "../img/woman.png";
import image2 from "../img/man.png";

const teamMembers = [
  { image: image1, number: "92015142", name: "박유진", role: "프론트엔드", introduce: "메인, 교육, 소개, 개발자 페이지, 디자인" },
  { image: image2, name: "신윤호", number: "91913646", role: "백엔드", introduce: "오답노트" },
  { image: image2, name: "이정호", number: "91914042", role: "프론트엔드, 백엔드", introduce: "게임 페이지, 로그인, 회원가입" },
  { image: image1, name: "최하은", number: "92113906", role: "프론트엔드", introduce: "마이페이지, 디자인" },
];

const TeamMember = ({ image, name, number, role, introduce }) => (
  <div className="team-member">
    <img src={image} alt={name} className="team-member-photo" />
    <h2>{name}</h2>
    <p>{number}</p>
    <h5>{role}</h5>
    <p>{introduce}</p>
  </div>
);

function TeamIntro() {
  return (
    <div className="introduce">
      <div className="introduceDiv-Final">
        <h1 style={{ marginBottom: "50px" }}>팀원 소개</h1>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamIntro;
