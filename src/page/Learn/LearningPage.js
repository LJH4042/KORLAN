import React, { useState } from "react";
import useLearning from "./useLearning";
import ConsonantList from "./ConsonantList";
import VowelList from "./VowelList";
import styles from "../../css/LearningPage.module.css";
import Canvas from "../../component/Canvas";
import useGoogleTTS from "./useGoogleTTS";

const consonants = [
  { id: 1, letter: "ㄱ", sound: "ㄱ", example: "가방, 가위, 고양이, 구름, 기차, 공" },
  { id: 2, letter: "ㄴ", sound: "ㄴ", example: "나비, 나무, 노래, 눈, 남자, 냉장고, 놀이터" },
  { id: 3, letter: "ㄷ", sound: "ㄷ", example: "다람쥐, 다리, 도서관, 달, 동물, 도넛, 돈" },
  { id: 4, letter: "ㄹ", sound: "ㄹ", example: "라디오, 라면, 리본, 로봇, 램프, 라디오, 리모컨" },
  { id: 5, letter: "ㅁ", sound: "ㅁ", example: "마차, 마을, 모자, 물, 문, 미소, 마스크" },
  { id: 6, letter: "ㅂ", sound: "ㅂ", example: "바지, 바다, 방, 비, 배, 버스, 바나나" },
  { id: 7, letter: "ㅅ", sound: "ㅅ", example: "사과, 산, 소, 시장, 수박, 시계" },
  { id: 8, letter: "ㅇ", sound: "ㅇ", example: "아이, 오리, 옷, 어머니, 연필, 언니" },
  { id: 9, letter: "ㅈ", sound: "ㅈ", example: "자석, 자전거, 종이, 집, 저녁, 지갑, 자동차" },
  { id: 10, letter: "ㅊ", sound: "ㅊ", example: "차, 친구, 치킨, 초콜릿, 책" },
  { id: 11, letter: "ㅋ", sound: "ㅋ", example: "코끼리, 카메라, 쿠키, 컵, 킥보드, 콜라" },
  { id: 12, letter: "ㅌ", sound: "ㅌ", example: "토마토, 토끼, 티셔츠, 탁자, 태양, 타이어, 터널" },
  { id: 13, letter: "ㅍ", sound: "ㅍ", example: "피자, 포도, 팔, 편지, 풋볼, 파도" },
  { id: 14, letter: "ㅎ", sound: "ㅎ", example: "하늘, 호랑이, 호수, 하루, 해, 행복" },
];

const vowels = [
  { id: 1, letter: "ㅏ", sound: "ㅏ", example: "아기, 아빠, 아이스크림, 아침, 악어, 아파트" },
  { id: 2, letter: "ㅑ", sound: "ㅑ", example: "야채, 야구, 약, 야자수, 야옹" },
  { id: 3, letter: "ㅓ", sound: "ㅓ", example: "엄마, 어린이, 어른, 어항, 어깨, 언덕" },
  { id: 4, letter: "ㅕ", sound: "ㅕ", example: "여우, 여자, 여름, 여행, 열쇠" },
  { id: 5, letter: "ㅗ", sound: "ㅗ", example: "오리, 오렌지, 오징어, 옷" },
  { id: 6, letter: "ㅛ", sound: "ㅛ", example: "요리, 요가, 요술, 요정" },
  { id: 7, letter: "ㅜ", sound: "ㅜ", example: "우유, 우산, 우체국, 우주, 운동" },
  { id: 8, letter: "ㅠ", sound: "ㅠ", example: "유리, 유니콘, 유모차, 유치원, 유령" },
  { id: 9, letter: "ㅡ", sound: "ㅡ", example: "으르렁, 으쓱, 은행, 응원, 음악" },
  { id: 10, letter: "ㅣ", sound: "ㅣ", example: "이름, 이불, 이모, 이사, 이빨" },
];

const doubleCons = [
  { id: 1, letter: "ㄲ", sound: "쌍기역", example: "까치, 꼬리, 꽃, 까마귀, 끈, 껌, 꿀" },
  { id: 2, letter: "ㄸ", sound: "ㄸ", example: "딸기, 땅, 떡, 뚜껑" },
  { id: 3, letter: "ㅃ", sound: "ㅃ", example: "빵, 뿌리, 뽀뽀, 뿔, 뻐꾸기" },
  { id: 4, letter: "ㅆ", sound: "ㅆ", example: "쌀, 쌍둥이, 쓰레기, 씨앗, 쑥" },
  { id: 5, letter: "ㅉ", sound: "ㅉ", example: "짜장, 쪽지, 짝궁, 쭈꾸미, 쫄면" },
];

const doubleVow = [
  { id: 1, letter: "ㅐ", sound: "애", example: "애기, 애완동물, 애벌레, 애인" },
  { id: 2, letter: "ㅒ", sound: "얘", example: "얘기" },
  { id: 3, letter: "ㅔ", sound: "에", example: "에너지, 에어컨, 엘리베이터, 에스컬레이터" },
  { id: 4, letter: "ㅖ", sound: "예", example: "예술, 예절, 예측, 예보" },
  { id: 5, letter: "ㅘ", sound: "와", example: "와인, 와플, 와이셔츠, 와이파이" },
  { id: 6, letter: "ㅙ", sound: "왜", example: "왜, 왜곡, 왜소" },
  { id: 7, letter: "ㅚ", sound: "외", example: "외국, 외계인, 외출" },
  { id: 8, letter: "ㅝ", sound: "워", example: "워터파크, 워킹" },
  { id: 9, letter: "ㅞ", sound: "웨", example: "웨이터, 웨딩, 웨이브" },
  { id: 10, letter: "ㅟ", sound: "위", example: "위험, 위생, 위치, 위로" },
  { id: 11, letter: "ㅢ", sound: "의", example: "의자, 의사, 의미, 의식, 의무" },
];

const LearningPage = () => {
  const {
    selectedLetter,
    handleLetterSelection,
    resetSelectedLetter
  } = useLearning();

  const [letterType, setLetterType] = useState("consonant");
  const [lastSelectedLetter, setLastSelectedLetter] = useState(null);
  const [exampleWord, setExampleWord] = useState("");
  const speak = useGoogleTTS();

  const toggleLetterType = (type) => {
    setLetterType(type);
    resetSelectedLetter(); // 글자 초기화 함수 호출
    setExampleWord("");
  };

  const handleLetterSelectionWithTTS = (letter) => {
    handleLetterSelection(letter);
    setLastSelectedLetter(letter);
    speak(letter);
    const selected = [...consonants, ...vowels, ...doubleCons, ...doubleVow].find(
      (item) => item.letter === letter
    );
    setExampleWord(selected ? selected.example : "");
  };
  
  const renderHighlightedExample = (word, letter) => {
    return word.split("").map((char, index) => (
      <span key={index} className={char === letter ? styles.highlight : ""}>
        {char}
      </span>
    ));
  };
  
  return (
    <div className={styles.pageContainer}>
      <h2>한글 깨우치기</h2>
      <div className={styles.buttonContainer}>
        <button onClick={() => toggleLetterType("consonant")}>자음 학습하기</button>
        <button onClick={() => toggleLetterType("vowel")}>모음 학습하기</button>
        <button onClick={() => toggleLetterType("doubleConsonant")}>쌍자음 학습하기</button>
        <button onClick={() => toggleLetterType("doubleVowel")}>쌍모음 학습하기</button>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.flexContainer}>
          {letterType === "consonant" && (
            <>
              <h3>자음 학습하기</h3>
              <ConsonantList
                consonants={consonants}
                onLetterSelect={handleLetterSelectionWithTTS}
              />
            </>
          )}
          {letterType === "vowel" && (
            <>
              <h3>모음 학습하기</h3>
              <VowelList
                vowels={vowels}
                onLetterSelect={handleLetterSelectionWithTTS}
              />
            </>
          )}
          {letterType === "doubleConsonant" && (
            <>
              <h3>쌍자음 학습하기</h3>
              <ConsonantList
                consonants={doubleCons}
                onLetterSelect={handleLetterSelectionWithTTS}
              />
            </>
          )}
          {letterType === "doubleVowel" && (
            <>
              <h3>쌍모음 학습하기</h3>
              <VowelList
                vowels={doubleVow}
                onLetterSelect={handleLetterSelectionWithTTS}
              />
            </>
          )}
          {selectedLetter && (
            <div className={styles.selectedLetterContainer}>
              <button onClick={() => lastSelectedLetter && speak(lastSelectedLetter)}>다시 듣기</button>
              <h3>선택한 글자: </h3>
              <p className={styles.selectedLetter}> {selectedLetter}</p>
              <div className={styles.exampleWord}>
            <h3>예시 단어: {renderHighlightedExample(exampleWord, lastSelectedLetter)}</h3>
            </div>
            </div>
          )}
          <Canvas />
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
