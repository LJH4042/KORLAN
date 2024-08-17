import React from 'react';
import '../css/card.css';

const Card = () => {
  const cardData = [
    {
      title: '학습하기',
      description: '한글의 기초, 자음과 모음을 만나 보아요',
      link: '/learn',
      className: 'learn-card'
    },
    {
      title: '이미지 게임',
      description: '다양한 사진을 통해 단어를 익혀 보아요',
      link: '/imageGame',
      className: 'image-card'
    },
    {
      title: '낱말 조합',
      description: '자모음을 조합해 단어를 만들어 보아요',
      link: '/combineGame',
      className: 'combine-card'
    }
  ];

  return (
    <div className="card-container">
      {cardData.map((card, index) => (
        <div key={index} className={`card ${card.className}`}>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <a href={card.link}>바로가기</a>
        </div>
      ))}
    </div>
  );
};

export default Card;
