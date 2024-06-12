// introduce.js
import React from 'react';
import '../css/introduce.css';

const teamMembers = [
  { name: '박유진', role: '프론트엔드 개발자' },
  { name: '신윤호', role: '백엔드 개발자' },
  { name: '이정호', role: '프론트엔드 개발자' },
  { name: '최하은', role: '프론트엔드 개발자' },
];

const TeamMember = ({ name, role }) => (
  <div className="team-member">
    <h2>{name}</h2>
    <p>{role}</p>
  </div>
);

const Introduce = () => (
  <div className="introduce">
    <h1>팀원 소개</h1>
    <div className="team-members">
      {teamMembers.map((member, index) => (
        <TeamMember key={index} {...member} />
      ))}
    </div>
  </div>
);

export default Introduce;
