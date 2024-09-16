import React, { useEffect, useRef, useState } from "react";
import "../css/notebook.css";
import Canvas from "../component/Canvas";
import useLearning from "./Learn/useLearning";
import ConsonantList from "./Learn/ConsonantList";
import VowelList from "./Learn/VowelList";
import styles from "../css/LearningPage.module.css";
import axios from "axios";
import { consonants, vowels, doubleCons, doubleVow } from "./Learn/LearnWord";

function Notebook() {
  const [noteWord, setNoteWord] = useState("");
  const [isCanvas, setIsCanvas] = useState(false);
  const { selectedLetter, handleLetterSelection, resetSelectedLetter } =
    useLearning();

  const [savedWords, setSavedWords] = useState({
    consonant: [],
    vowel: [],
    doubleConsonant: [],
    doubleVowel: [],
  });

  const [letterType, setLetterType] = useState(""); //현재 선택된 글자의 유형을 저장
  const [lastSelectedLetter, setLastSelectedLetter] = useState(null); //마지막으로 선택된 글자를 저장
  const [exampleWord, setExampleWord] = useState(""); //선택된 글자의 예시 단어들을 저장
  const [currentNum, setCurrentNum] = useState(1); //맞춘 횟수를 저장
  const [previousAnswer, setPreviousAnswer] = useState(""); //이전에 입력한 답변을 저장

  const canvasRef = useRef(null); // Ref for Canvas

  const toggleLetterType = (type) => {
    setLetterType(type);
    resetSelectedLetter(); // 글자 초기화 함수 호출
    setExampleWord("");
    setIsCanvas(false);
  };

  //사용자가 선택한 글자를 TTS를 통해 발음
  const handleLetterSelectionWithTTS = (letter) => {
    handleLetterSelection(letter); //선택된 글자를 처리합니다.
    setLastSelectedLetter(letter); //마지막으로 선택된 글자를 저장
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

  const renderHighlightedExample = (word, letter) => {
    const words = word.split(", ");
    return words.map((word, index) => (
      <React.Fragment key={index}>
        <span
          onClick={() => {
            setNoteWord(word);
            setIsCanvas(true);
            if (canvasRef.current) {
              canvasRef.current.clearCanvas(); // Clear canvas on click
            }
          }}
          className={
            savedWords[letterType].includes(word)
              ? styles.savedWord
              : styles.baseWord
          }
        >
          {word}
        </span>
        {index < words.length - 1 && ", "}
      </React.Fragment>
    ));
  };

  const checkAnswer = async (userAnswer) => {
    let allExampleWords = [];
    switch (letterType) {
      case "consonant":
        allExampleWords = consonants.flatMap((item) =>
          item.letter === selectedLetter ? item.example.split(", ") : []
        );
        break;
      case "vowel":
        allExampleWords = vowels.flatMap((item) =>
          item.letter === selectedLetter ? item.example.split(", ") : []
        );
        break;
      case "doubleConsonant":
        allExampleWords = doubleCons.flatMap((item) =>
          item.letter === selectedLetter ? item.example.split(", ") : []
        );
        break;
      case "doubleVowel":
        allExampleWords = doubleVow.flatMap((item) =>
          item.letter === selectedLetter ? item.example.split(", ") : []
        );
        break;
      default:
        break;
    }
    const trimmedUserAnswer = userAnswer.trim();
    /*const isCorrect = allExampleWords.includes(trimmedUserAnswer);*/
    const isCorrect = trimmedUserAnswer === noteWord;

    if (isCorrect) {
      if (trimmedUserAnswer === previousAnswer) {
        alert(`잘했어요! ${currentNum} / 3`);
        setCurrentNum((prevNum) => prevNum + 1);
        if (currentNum === 3) {
          setCurrentNum(1);
          updateWord(trimmedUserAnswer);
          alert("훌륭해요!!!!!!");
        }
      } else if (previousAnswer === "") {
        alert(`잘했어요! ${currentNum} / 3`);
        setCurrentNum((prevNum) => prevNum + 1);
      } else {
        setCurrentNum(2);
        alert(`잘했어요! 1 / 3`);
      }
    } else {
      alert("예시 단어가 아니거나, 최대한 또박또박 바르게 써주세요.");
      setCurrentNum(1);
      try {
        const token = localStorage.getItem("token");
        if (token === null) return;
        await axios.post(
          "http://localhost:5000/wrong-answers",
          {
            question: selectedLetter,
            givenAnswer: trimmedUserAnswer,
            correctAnswer: allExampleWords.join(", "),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.error("오답 저장 실패:", error);
      }
    }
    setPreviousAnswer(trimmedUserAnswer);
  };

  const updateWord = async (trimmedUserAnswer) => {
    const token = localStorage.getItem("token");
    if (token === null) return;
    const headerData = {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    };
    try {
      await axios.post(
        "http://localhost:5000/learn",
        { learnWord: trimmedUserAnswer, letterType: letterType },
        headerData
      );

      // 새로 추가된 단어를 상태에 즉시 반영
      setSavedWords((prevWords) => {
        const updatedWords = { ...prevWords };
        if (letterType === "consonant") {
          updatedWords.consonant = [...prevWords.consonant, trimmedUserAnswer];
        } else if (letterType === "vowel") {
          updatedWords.vowel = [...prevWords.vowel, trimmedUserAnswer];
        } else if (letterType === "doubleConsonant") {
          updatedWords.doubleConsonant = [
            ...prevWords.doubleConsonant,
            trimmedUserAnswer,
          ];
        } else if (letterType === "doubleVowel") {
          updatedWords.doubleVowel = [
            ...prevWords.doubleVowel,
            trimmedUserAnswer,
          ];
        }
        return updatedWords; // 상태 업데이트 후 컴포넌트가 다시 렌더링됩니다.
      });
    } catch (err) {
      if (err.response.status === 401) {
        try {
          const refreshRes = await axios.post(
            "http://localhost:5000/refresh",
            {},
            { withCredentials: true }
          );
          const newToken = refreshRes.data.token;
          localStorage.setItem("token", newToken);
          axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          updateWord(trimmedUserAnswer); // 토큰을 갱신하고 다시 호출합니다.
        } catch (err) {
          console.error(err);
          localStorage.removeItem("token");
        }
      } else {
        console.error(err);
        localStorage.removeItem("token");
      }
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSavedWords({
        consonant: [],
        vowel: [],
        doubleConsonant: [],
        doubleVowel: [],
      });
      return;
    }
    const headerData = {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    };
    try {
      const res = await axios.get("http://localhost:5000/login", headerData);
      setSavedWords({
        consonant: res.data.learnPoint.consonant,
        vowel: res.data.learnPoint.vowel,
        doubleConsonant: res.data.learnPoint.doubleConsonant,
        doubleVowel: res.data.learnPoint.doubleVowel,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="notebookContainer">
      <div className="notebookDiv">
        <h1 className="notebookTitle">연습장</h1>
        <p className="notebookDescription">
          -연습장에 글씨를 쓰며 한글 실력을 키워보세요!-
        </p>
        <div className={styles.buttonContainer}>
          <button onClick={() => toggleLetterType("consonant")}>
            자음 연습장
          </button>
          <button onClick={() => toggleLetterType("vowel")}>모음 연습장</button>
          <button onClick={() => toggleLetterType("doubleConsonant")}>
            쌍자음 연습장
          </button>
          <button onClick={() => toggleLetterType("doubleVowel")}>
            쌍모음 연습장
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.flexContainer}>
            {letterType === "consonant" && (
              <>
                <h3>자음 연습장</h3>
                <ConsonantList
                  consonants={consonants}
                  onLetterSelect={handleLetterSelectionWithTTS}
                  setIsCanvas={setIsCanvas}
                />
              </>
            )}
            {letterType === "vowel" && (
              <>
                <h3>모음 연습장</h3>
                <VowelList
                  vowels={vowels}
                  onLetterSelect={handleLetterSelectionWithTTS}
                  setIsCanvas={setIsCanvas}
                />
              </>
            )}
            {letterType === "doubleConsonant" && (
              <>
                <h3>쌍자음 연습장</h3>
                <ConsonantList
                  consonants={doubleCons}
                  onLetterSelect={handleLetterSelectionWithTTS}
                  setIsCanvas={setIsCanvas}
                />
              </>
            )}
            {letterType === "doubleVowel" && (
              <>
                <h3>쌍모음 연습장</h3>
                <VowelList
                  vowels={doubleVow}
                  onLetterSelect={handleLetterSelectionWithTTS}
                  setIsCanvas={setIsCanvas}
                />
              </>
            )}
            {selectedLetter && (
              <div className={styles.selectedLetterContainer}>
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
        {isCanvas ? (
          <div className="canvasWrapper" style={{ textAlign: "center" }}>
            <h1>{noteWord}</h1>
            <Canvas ref={canvasRef} checkAnswer={checkAnswer} />
          </div>
        ) : null}
        <div
          className="ruleDiv"
          style={{
            backgroundColor: "#f9f9f9",
            width: "800px",
            marginTop: "20px",
          }}
        >
          <p>
            -각 자음/모음마다 제시된 예시 단어를 클릭하면 캔버스가 뜹니다.
            마우스로 캔버스에다 단어를 써주세요.
          </p>
          <p>
            -최대한 또박또박 바르게 단어를 써주세요. 엉망으로 쓰시면 오답처리가
            됩니다.
          </p>
          <p>-단어를 올바르게 쓰면 '잘했어요!'라고 뜨며 정답 처리가 됩니다.</p>
          <p>
            -총 3번 '잘했어요!'를 받으시면 '훌륭해요!'라고 뜨며 그 단어의 학습이
            완료됩니다.
          </p>
          <p>
            -학습이 완료된 단어는 빨간색으로 표시됩니다. 단 로그인을 했을 시에만
            적용됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Notebook;
