import React from "react";
import "../css/introduce.css";
import image1 from "../img/woman.png";
import image2 from "../img/man.png";

const teamMembers = [
  {
    image: image1,
    number: "92015142",
    name: "박유진",
    role: "프론트엔드",
    introduce1: "메인",
    introduce2: "소개",
    introduce3: "학습하기",
    introduce4: "연습장",
    introduce5: "개발팀",
    introduce6: "디자인",
  },
  {
    image: image2,
    name: "신윤호",
    number: "91913646",
    role: "백엔드",
    introduce1: "서버",
    introduce2: "마이페이지",
    introduce3: "",
    introduce4: "",
    introduce5: "",
    introduce6: "",
  },
  {
    image: image2,
    name: "이정호",
    number: "91914042",
    role: "프론트엔드, 백엔드",
    introduce1: "로그인",
    introduce2: "회원가입",
    introduce3: "게임하기",
    introduce4: "연습장",
    introduce5: "디자인",
    introduce6: "서버",
  },
  {
    image: image1,
    name: "최하은",
    number: "92113906",
    role: "프론트엔드",
    introduce1: "마이페이지",
    introduce2: "디자인",
    introduce3: "",
    introduce4: "",
    introduce5: "",
    introduce6: "",
  },
];

const TeamMember = ({
  image,
  name,
  number,
  role,
  introduce1,
  introduce2,
  introduce3,
  introduce4,
  introduce5,
  introduce6,
}) => (
  <div className="team-member">
    <img src={image} alt={name} className="team-member-photo" />
    <h2>{name}</h2>
    <p style={{ marginTop: "10px" }}>{number}</p>
    <h5>{role}</h5>
    <p>{introduce1}</p>
    <p>{introduce2}</p>
    <p>{introduce3}</p>
    <p>{introduce4}</p>
    <p>{introduce5}</p>
    <p>{introduce6}</p>
  </div>
);

function TeamIntro() {
  return (
    <div className="teamIntroduce">
      <div className="teamIntroduceDiv">
        <h1
          style={{
            marginBottom: "50px",
            letterSpacing: "5px",
            fontSize: "30px",
          }}
        >
          -팀원 소개-
        </h1>
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
