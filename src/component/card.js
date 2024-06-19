import React from 'react';
import '../css/card.css';

const Card = () => {
  const cardData = [
    {
      title: '학습하기',
      description: '학습하기상세',
      link: '/learn'
    },
    {
      title: '이미지 게임',
      description: '이미지게임상세',
      link: '/imageGame'
    },
    {
      title: '낱말 조합',
      description: '낱말조합상세',
      link: '/combineGame'
    }
  ];

  return (
    <div className="card-container">
      {cardData.map((card, index) => (
        <div key={index} className="card">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <a href={card.link}>바로가기</a>
        </div>
      ))}
    </div>
  );
};

export default Card;