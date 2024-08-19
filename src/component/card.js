import React from "react";
import "../css/card.css";
import learnImg from "../img/learn.png";
import imageGameImg from "../img/imageGama.png";
import combineGameImg from "../img/combineGame.png";
import noteImg from "../img/pencil.png";

const Card = () => {
  const cardData = [
    {
      title: "학습하기",
      image: learnImg,
      description: "한글의 기초,",
      description_2: "자음과 모음을 만나 보아요",
      link: "/learn",
      className: "learn-card",
    },
    {
      title: "이미지 게임",
      image: imageGameImg,
      description: "다양한 사진을 통해",
      description_2: "단어를 익혀 보아요",
      link: "/imageGame",
      className: "image-card",
    },
    {
      title: "낱말 조합",
      image: combineGameImg,
      description: "자모음을 조합해",
      description_2: "단어를 만들어 보아요",
      link: "/combineGame",
      className: "combine-card",
    },
    {
      title: "연습장",
      image: noteImg,
      description: "단어를 쓰며",
      description_2: "한글 실력을 키워보아요",
      link: "/notebook",
      className: "note-card",
    },
  ];

  return (
    <div className="card-container">
      {cardData.map((card, index) => (
        <div key={index} className={`card ${card.className}`}>
          <h3>{card.title}</h3>
          <div className="card-image">
            <img src={card.image} alt={card.title} />
          </div>
          <p>{card.description}</p>
          <p>{card.description_2}</p>
          <a href={card.link}>바로가기→</a>
        </div>
      ))}
    </div>
  );
};

export default Card;
