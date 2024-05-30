// LearningPage.js

import React, { useState } from 'react';
import useLearning from './useLearning';
import ConsonantList from './ConsonantList';
import VowelList from './VowelList';
import styles from './LearningPage.module.css';
import Canvas from './Canvas';

const consonants = [
  // 자음 목록
  { id: 1, letter: 'ㄱ', sound: 'ㄱ' },
  { id: 2, letter: 'ㄴ', sound: 'ㄴ' },
  { id: 3, letter: 'ㄷ', sound: 'ㄷ' },
  { id: 4, letter: 'ㄹ', sound: 'ㄹ' },
  { id: 5, letter: 'ㅁ', sound: 'ㅁ' },
  { id: 6, letter: 'ㅂ', sound: 'ㅂ' },
  { id: 7, letter: 'ㅅ', sound: 'ㅅ' },
  { id: 8, letter: 'ㅇ', sound: 'ㅇ' },
  { id: 9, letter: 'ㅈ', sound: 'ㅈ' },
  { id: 10, letter: 'ㅊ', sound: 'ㅊ' },
  { id: 11, letter: 'ㅋ', sound: 'ㅋ' },
  { id: 12, letter: 'ㅌ', sound: 'ㅌ' },
  { id: 13, letter: 'ㅍ', sound: 'ㅍ' },
  { id: 14, letter: 'ㅎ', sound: 'ㅎ' },
];

const vowels = [
  // 모음 목록
  { id: 1, letter: 'ㅏ', sound: 'ㅏ' },
  { id: 2, letter: 'ㅑ', sound: 'ㅑ' },
  { id: 3, letter: 'ㅓ', sound: 'ㅓ' },
  { id: 4, letter: 'ㅕ', sound: 'ㅕ' },
  { id: 5, letter: 'ㅗ', sound: 'ㅗ' },
  { id: 6, letter: 'ㅛ', sound: 'ㅛ' },
  { id: 7, letter: 'ㅜ', sound: 'ㅜ' },
  { id: 8, letter: 'ㅠ', sound: 'ㅠ' },
  { id: 9, letter: 'ㅡ', sound: 'ㅡ' },
  { id: 10, letter: 'ㅣ', sound: 'ㅣ' },
];

const doubleCons = [
  { id: 1, letter: 'ㄲ', sound: '쌍기역' },
  { id: 2, letter: 'ㄸ', sound: 'ㄸ' },
  { id: 3, letter: 'ㅃ', sound: 'ㅃ' },
  { id: 4, letter: 'ㅆ', sound: 'ㅆ' },
  { id: 5, letter: 'ㅉ', sound: 'ㅉ' },
];

const doubleVow = [
  { id: 1, letter: "ㅐ", sound: "애" },
  { id: 2, letter: "ㅒ", sound: "얘" },
  { id: 3, letter: "ㅔ", sound: "에" },
  { id: 4, letter: "ㅖ", sound: "예" },
  { id: 5, letter: "ㅘ", sound: "와" },
  { id: 6, letter: "ㅙ", sound: "왜" },
  { id: 7, letter: "ㅚ", sound: "외" },
  { id: 8, letter: "ㅝ", sound: "워" },
  { id: 9, letter: "ㅞ", sound: "웨" },
  { id: 10, letter: "ㅟ", sound: "위" },
  { id: 11, letter: "ㅢ", sound: "의" }
];

const LearningPage = () => {
  const {
    selectedLetter,
    handleLetterSelection,
    // progress,
    // rewards,
    // studyImage,
    // isStudyComplete,
    // completeStudy,
  } = useLearning();

  const [letterType, setLetterType] = useState('consonant'); // 'consonant', 'vowel', 'doubleConsonant', 'doubleVowel'

  const toggleLetterType = (type) => {
    setLetterType(type);
  };

  return (
    <div className={styles.pageContainer}>
      <h2>한글 깨우치기</h2>
      <div className={styles.buttonContainer}>
        <button onClick={() => toggleLetterType('consonant')}>
          자음 학습하기
        </button>
        <button onClick={() => toggleLetterType('vowel')}>
          모음 학습하기
        </button>
        <button onClick={() => toggleLetterType('doubleConsonant')}>
          쌍자음 학습하기
        </button>
        <button onClick={() => toggleLetterType('doubleVowel')}>
          쌍모음 학습하기
        </button>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.flexContainer}>
          {letterType === 'consonant' && (
            <>
              <h3>자음 학습하기</h3>
              <ConsonantList consonants={consonants} onLetterSelect={handleLetterSelection} />
            </>
          )}
          {letterType === 'vowel' && (
            <>
              <h3>모음 학습하기</h3>
              <VowelList vowels={vowels} onLetterSelect={handleLetterSelection} />
            </>
          )}
          {letterType === 'doubleConsonant' && (
            <>
              <h3>쌍자음 학습하기</h3>
              <ConsonantList consonants={doubleCons} onLetterSelect={handleLetterSelection} />
            </>
          )}
          {letterType === 'doubleVowel' && (
            <>
              <h3>쌍모음 학습하기</h3>
              <VowelList vowels={doubleVow} onLetterSelect={handleLetterSelection} />
            </>
          )}
          {selectedLetter && (
            <div>
              <h3>선택한 글자:</h3>
              <p className={styles.selectedLetter}> {selectedLetter}</p>
            </div>
          )}
          <br />
          <Canvas />
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
