import React, { useState, useEffect, useRef } from "react";
import useLearning from "./useLearning";
import ConsonantList from "./ConsonantList";
import VowelList from "./VowelList";
import styles from "../../css/LearningPage.module.css";
import Canvas from "../../component/Canvas";
import useGoogleTTS from "./useGoogleTTS";
import axios from "axios";

const consonants = [
  {
    id: 1,
    letter: "ㄱ",
    sound: "ㄱ",
    example: "가방, 가위, 고양이, 구름, 기차",
  },
  {
    id: 2,
    letter: "ㄴ",
    sound: "ㄴ",
    example: "나무늘보, 나비, 나침반, 냉장고, 눈사람",
  },
  {
    id: 3,
    letter: "ㄷ",
    sound: "ㄷ",
    example: "달력, 달팽이, 당근, 독수리, 돈",
  },
  {
    id: 4,
    letter: "ㄹ",
    sound: "ㄹ",
    example: "라디오, 라면, 로봇, 리모컨, 리본",
  },
  {
    id: 5,
    letter: "ㅁ",
    sound: "ㅁ",
    example: "모자, 목걸이, 무지개, 문어, 미끄럼틀",
  },
  {
    id: 6,
    letter: "ㅂ",
    sound: "ㅂ",
    example: "바나나, 바이올린, 뱀, 버스, 비행기",
  },
  {
    id: 7,
    letter: "ㅅ",
    sound: "ㅅ",
    example: "사과, 사자, 선인장, 수박, 신호등",
  },
  {
    id: 8,
    letter: "ㅇ",
    sound: "ㅇ",
    example: "아기, 어머니, 연필, 오리, 옷",
  },
  {
    id: 9,
    letter: "ㅈ",
    sound: "ㅈ",
    example: "자동차, 자전거, 장미, 젓가락, 조개",
  },
  {
    id: 10,
    letter: "ㅊ",
    sound: "ㅊ",
    example: "책, 책상, 초콜릿, 침대, 칫솔",
  },
  {
    id: 11,
    letter: "ㅋ",
    sound: "ㅋ",
    example: "카메라, 카멜레온, 컴퓨터, 컵, 코끼리",
  },
  {
    id: 12,
    letter: "ㅌ",
    sound: "ㅌ",
    example: "타조, 탬버린, 토끼, 토마토, 티셔츠",
  },
  {
    id: 13,
    letter: "ㅍ",
    sound: "ㅍ",
    example: "파리, 포도, 풍선, 프린터, 피아노",
  },
  {
    id: 14,
    letter: "ㅎ",
    sound: "ㅎ",
    example: "하모니카, 해바라기, 햄버거, 헬리콥터, 호랑이",
  },
];
const vowels = [
  {
    id: 1,
    letter: "ㅏ",
    sound: "ㅏ",
    example: "아이스크림, 아침, 아파트, 악어, 안경",
  },
  { id: 2, letter: "ㅑ", sound: "ㅑ", example: "야경, 야구, 야자수, 야채, 약" },
  {
    id: 3,
    letter: "ㅓ",
    sound: "ㅓ",
    example: "어른, 어린이, 어머니, 어항, 얼룩말",
  },
  { id: 4, letter: "ㅕ", sound: "ㅕ", example: "여름, 여우, 여행, 열쇠, 연필" },
  {
    id: 5,
    letter: "ㅗ",
    sound: "ㅗ",
    example: "오렌지, 오징어, 오토바이, 옥수수, 옷",
  },
  {
    id: 6,
    letter: "ㅛ",
    sound: "ㅛ",
    example: "요구르트, 요리, 요술, 요요, 요정",
  },
  {
    id: 7,
    letter: "ㅜ",
    sound: "ㅜ",
    example: "우산, 우유, 우주, 우체국, 운동",
  },
  {
    id: 8,
    letter: "ㅠ",
    sound: "ㅠ",
    example: "유니콘, 유령, 유리, 유모차, 유치원",
  },
  {
    id: 9,
    letter: "ㅡ",
    sound: "ㅡ",
    example: "으르렁, 으쓱, 은행, 음악, 응원",
  },
  {
    id: 10,
    letter: "ㅣ",
    sound: "ㅣ",
    example: "이름, 이발소, 이빨, 이불, 이어폰",
  },
];
const doubleCons = [
  {
    id: 1,
    letter: "ㄲ",
    sound: "쌍기역",
    example: "까치, 껌, 꼬리, 꿀, 끈",
  },
  {
    id: 2,
    letter: "ㄸ",
    sound: "ㄸ",
    example: "딱따구리, 딱지, 딸기, 떡, 뚜껑",
  },
  { id: 3, letter: "ㅃ", sound: "ㅃ", example: "빨강, 빵, 뻐꾸기, 뿌리, 뿔" },
  {
    id: 4,
    letter: "ㅆ",
    sound: "ㅆ",
    example: "쌀, 쌍둥이, 쑥, 쓰레기통, 씨앗",
  },
  {
    id: 5,
    letter: "ㅉ",
    sound: "ㅉ",
    example: "짜장면, 짝, 짝궁, 쪽지, 쭈꾸미",
  },
];
const doubleVow = [
  {
    id: 1,
    letter: "ㅐ",
    sound: "애",
    example: "애기, 애벌레, 애완동물, 애인, 애플파이",
  },
  {
    id: 2,
    letter: "ㅒ",
    sound: "얘",
    example: "얘기, 얘기꽃, 얘박, 얘장깐, 얘청",
  },
  {
    id: 3,
    letter: "ㅔ",
    sound: "에",
    example: "에너지, 엘리베이터, 에스컬레이터, 에어컨, 에코백",
  },
  { id: 4, letter: "ㅖ", sound: "예", example: "예감, 예보, 예술, 예절, 예측" },
  {
    id: 5,
    letter: "ㅘ",
    sound: "와",
    example: "와이셔츠, 와이어, 와이파이, 와인, 와플",
  },
  {
    id: 6,
    letter: "ㅙ",
    sound: "왜",
    example: "왜가리, 왜관, 왜곡, 왜냐하면, 왜소",
  },
  {
    id: 7,
    letter: "ㅚ",
    sound: "외",
    example: "외계인, 외국, 외로움, 외삼촌, 외출",
  },
  {
    id: 8,
    letter: "ㅝ",
    sound: "워",
    example: "워드, 워킹, 워크숍, 워터파크, 원숭이",
  },
  {
    id: 9,
    letter: "ㅞ",
    sound: "웨",
    example: "웨딩, 웨이브, 웨이터, 웨이팅, 웨하스",
  },
  {
    id: 10,
    letter: "ㅟ",
    sound: "위",
    example: "위로, 위생, 위성, 위치, 위험",
  },
  {
    id: 11,
    letter: "ㅢ",
    sound: "의",
    example: "의무, 의미, 의사, 의식, 의자",
  },
];

const LearningPage = () => {
  const { selectedLetter, handleLetterSelection, resetSelectedLetter } =
    useLearning();

  const [letterType, setLetterType] = useState(""); //현재 선택된 글자의 유형을 저장
  const [lastSelectedLetter, setLastSelectedLetter] = useState(null); //마지막으로 선택된 글자를 저장
  const [exampleWord, setExampleWord] = useState(""); //선택된 글자의 예시 단어들을 저장
  const speak = useGoogleTTS();

  const setIsCanvas = () => null;

  const toggleLetterType = (type) => {
    setLetterType(type);
    resetSelectedLetter(); // 글자 초기화 함수 호출
    setExampleWord("");
  };

  const handleLetterSelectionWithTTS = (letter) => {
    handleLetterSelection(letter);
    setLastSelectedLetter(letter);
    speak(letter);
    const selected =
      letterType === "consonant"
        ? consonants.find((item) => item.letter === letter)
        : letterType === "vowel"
        ? vowels.find((item) => item.letter === letter)
        : letterType === "doubleConsonant"
        ? doubleCons.find((item) => item.letter === letter)
        : doubleVow.find((item) => item.letter === letter);

    setExampleWord(selected ? selected.example : "");
  };

  // 예시 단어를 클릭하면 TTS로 발음되도록 수정
  const renderHighlightedExample = (word, letter) => {
    const words = word.split(", ");
    return words.map((word, index) => (
      <React.Fragment key={index}>
        <span
          onClick={() => speak(word)} // 예시 단어 클릭 시 TTS 발음
          className={styles.baseWord}
        >
          {word}
        </span>
        {index < words.length - 1 && ", "}
      </React.Fragment>
    ));
  };
  const canvasRef = useRef(null);
  
  const checkAnswer = async (userAnswer) => {
    const trimmedUserAnswer = userAnswer.trim();
    speak(trimmedUserAnswer); // 사용자가 입력한 단어를 TTS로 발음
  };

  const checkToken = async () => {
    if (localStorage.getItem("token") === null) return;
    try {
      const refreshRes = await axios.post(
        "http://localhost:5000/refresh",
        {},
        { withCredentials: true }
      );
      const newToken = refreshRes.data.token;
      localStorage.setItem("token", newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    } catch (err) {
      if (err.response && err.response.status === 403) {
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.learnContainer}>
        <h1>학습하기</h1>
        <p style={{ fontSize: "1.2em", color: "#666", marginTop: "0px" }}>
          -자음과 모음의 발음을 들으며 한글을 익혀요!-
        </p>
        <div className={styles.buttonContainer}>
          <button onClick={() => toggleLetterType("consonant")}>
            자음 학습하기
          </button>
          <button onClick={() => toggleLetterType("vowel")}>
            모음 학습하기
          </button>
          <button onClick={() => toggleLetterType("doubleConsonant")}>
            쌍자음 학습하기
          </button>
          <button onClick={() => toggleLetterType("doubleVowel")}>
            쌍모음 학습하기
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.flexContainer}>
            {letterType === "consonant" && (
              <>
                <h3>자음 학습하기</h3>
                <ConsonantList
                  consonants={consonants}
                  onLetterSelect={handleLetterSelectionWithTTS}
                  setIsCanvas={setIsCanvas}
                />
              </>
            )}
            {letterType === "vowel" && (
              <>
                <h3>모음 학습하기</h3>
                <VowelList
                  vowels={vowels}
                  onLetterSelect={handleLetterSelectionWithTTS}
                  setIsCanvas={setIsCanvas}
                />
              </>
            )}
            {letterType === "doubleConsonant" && (
              <>
                <h3>쌍자음 학습하기</h3>
                <ConsonantList
                  consonants={doubleCons}
                  onLetterSelect={handleLetterSelectionWithTTS}
                  setIsCanvas={setIsCanvas}
                />
              </>
            )}
            {letterType === "doubleVowel" && (
              <>
                <h3>쌍모음 학습하기</h3>
                <VowelList
                  vowels={doubleVow}
                  onLetterSelect={handleLetterSelectionWithTTS}
                  setIsCanvas={setIsCanvas}
                />
              </>
            )}
            {selectedLetter && (
              <div className={styles.selectedLetterContainer}>
                <button
                  onClick={() =>
                    lastSelectedLetter && speak(lastSelectedLetter)
                  }
                >
                  다시 듣기
                </button>
                <p className={styles.selectedLetter}> {selectedLetter}</p>
                <div className={styles.exampleWord}>
                  <h3>
                    {renderHighlightedExample(exampleWord, lastSelectedLetter)}
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop: "50px" }}>
          <Canvas ref={canvasRef} checkAnswer={checkAnswer} />
        </div>
        <div className="ruleDiv" style={{ backgroundColor: "#f9f9f9" }}>
          <p>-각 단어들을 클릭하면 해당 단어의 발음 소리가 재생됩니다.</p>
          <p>
            -마우스로 캔버스에 단어를 쓰고 '확인' 버튼을 누르시면 쓴 단어의 발음
            소리가 재생됩니다.
          </p>
          <p>-위에 예시 단어 외에 다른 단어를 써도 발음 소리가 재생됩니다.</p>
          <p>
            -최대한 또박또박 바르게 단어를 써주세요. 엉망으로 쓰시면 발음이
            제대로 재생되지 않습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
