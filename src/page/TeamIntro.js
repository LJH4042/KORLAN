import React from "react";
import "../css/introduce.css";
import image1 from "../img/woman.png";
import image2 from "../img/man.png";

const teamMembers = [
  { image: image1, name: "박유진", role: "프론트엔드" },
  { image: image2, name: "신윤호", role: "백엔드" },
  { image: image2, name: "이정호", role: "프론트엔드" },
  { image: image1, name: "최하은", role: "프론트엔드" },
];

const TeamMember = ({ image, name, role }) => (
  <div className="team-member">
    <img src={image} alt={name} className="team-member-photo" />
    <h2>{name}</h2>
    <p>{role}</p>
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
