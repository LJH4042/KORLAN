// introduce.js
import React from "react";
import "../css/introduce.css";
import introImg from "../img/intro.png";
import programIntro from "../img/programIntro.png";

const TechnologyIcons = () => (
  <div>
    <img src={programIntro} alt="programIntro" className="progrom-img" />
  </div>
);

const Introduce = () => (
  <div className="introduce">
    <div className="imgDiv">
      <img src={introImg} alt={"소개글"} />
    </div>
    <div className="introduceBg">
      <br />
      <div
        className="introduceDiv"
        style={{ borderTop: "10px double #fcf9f2" }}
      >
        <h1>-?또박또박이란?-</h1>
        <div className="site-introduce" style={{ marginTop: "60px" }}>
          <p>
            어린이들이 한글 자모와 기본 단어를 익히고, <br /> 재미있는 방식으로
            한글을 사용할 수 있는 웹사이트입니다.
          </p>
          <br />
          <p>
            학습을 통해 자모의 정확한 발음을 들을 수 있고, 따라서 써볼 수도
            있습니다. <br />
            또한 이미지 게임과 단어 조합을 통해 단어를 익히며 즐겁게 학습할 수
            있습니다.
            <br />
            학습, 게임을 하다가 틀린 단어는 오답 노트를 통해 다시 확인할 수
            있습니다.
          </p>
          <br />
          <p>
            어린이들이 스스로 학습할 수 있는 안전하고 즐거운 환경을 제공합니다.{" "}
            <br />
            함께 재미있게 한글을 배우고, 학습의 즐거움을 느껴 보아요!
          </p>
        </div>
      </div>
      <div className="introduceDiv">
        <h1>-사용 기술-</h1>
        <div>
          <TechnologyIcons />
        </div>
      </div>
      <div className="introduceDiv-Final">
        <h1 style={{ marginBottom: "60px" }}>-소스 코드-</h1>
        <div className="site-introduce">
          <div
            className="icon-container"
            onClick={() =>
              window.open("https://github.com/LJH4042/KORLAN", "_blank")
            }
          >
            <span className="icon">🔗</span>
          </div>
          아이콘을 누르면 작업한 홈페이지의 소스 코드를 올려 둔 <br />
          깃허브 주소를 확인하실 수 있습니다.
        </div>
      </div>
      <br />
    </div>
  </div>
);

export default Introduce;
