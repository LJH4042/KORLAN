// useLearning.js
import { useState, useEffect } from 'react';
import useGoogleTTS from './useGoogleTTS';

const useLearning = () => {
  const [selectedLetter, setSelectedLetter] = useState('');
  const speak = useGoogleTTS();

  useEffect(() => {
    const playSpeech = async () => {
      if (selectedLetter) {
        try {
          await speak(selectedLetter);
        } catch (error) {
          console.error('문자 선택 시 오류 발생:', error);
        }
      }
    };

    playSpeech();
  }, [selectedLetter, speak]);

  const handleLetterSelection = (letter) => {
    setSelectedLetter(letter);
  };

  return {
    selectedLetter,
    handleLetterSelection,
  };
};

export default useLearning;
