// introduce.js
import React from 'react';
import '../css/introduce.css';

const teamMembers = [
  { name: '박유진', role: '프론트엔드' },
  { name: '신윤호', role: '백엔드' },
  { name: '이정호', role: '프론트엔드' },
  { name: '최하은', role: '프론트엔드' },
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
    <div className='site-introduce'>
      어린이들이 한글 자모와 기본 단어를 익히고, 재미있는 방식으로 한글을 사용할 수 있는 페이지를 만드는 게 목표였습니다.<br />
      학습을 통해 자모의 정확한 발음을 들을 수 있고, 따라서 써볼 수도 있습니다. <br />
      또한 이미지 게임과 단어 조합을 통해 단어를 응용하여 학습할 수 있습니다.
    </div>
    <div>
      <div className='site-introduce'>
        <div className='icon-container' onClick={() => window.open('https://github.com/LJH4042/KORLAN', '_blank')}>
          <span className='icon'>🔗</span>
        </div>
        아이콘을 누르면 저희가 작업한 홈페이지의 소스 코드를 올려 둔 깃허브 주소를 확인하실 수 있습니다.
      </div>
    </div>
  </div>
);

export default Introduce;
