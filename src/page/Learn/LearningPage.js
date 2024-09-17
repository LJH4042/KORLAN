import React, { useState, useEffect } from "react";
import useLearning from "./useLearning";
import ConsonantList from "./ConsonantList";
import VowelList from "./VowelList";
import styles from "../../css/LearningPage.module.css";
import Canvas from "../../component/Canvas";
import useGoogleTTS from "./useGoogleTTS";
import axios from "axios";
import { consonants, vowels, doubleCons, doubleVow } from "./LearnWord";

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

  //사용자가 선택한 글자를 TTS를 통해 발음
  const handleLetterSelectionWithTTS = (letter) => {
    handleLetterSelection(letter); //선택된 글자를 처리합니다.
    setLastSelectedLetter(letter); //마지막으로 선택된 글자를 저장
    speak(letter); //TTS로 발음
    //선택된 글자 유형에 해당하는 배열에서 글자를 찾음
    const selected =
      letterType === "consonant"
        ? consonants.find((item) => item.letter === letter)
        : letterType === "vowel"
        ? vowels.find((item) => item.letter === letter)
        : letterType === "doubleConsonant"
        ? doubleCons.find((item) => item.letter === letter)
        : doubleVow.find((item) => item.letter === letter);
    //선택된 글자가 있으면 exampleWord 지정
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
          <Canvas checkAnswer={checkAnswer} />
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
