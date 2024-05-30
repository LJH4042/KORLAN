// useLearning.js
import { useState } from 'react';
import useSpeechSynthesis from './useSpeechSynthesis';

const useLearning = () => {
  const [selectedLetter, setSelectedLetter] = useState('');
  const [progress, setProgress] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [studyImage, setStudyImage] = useState('');
  const [isStudyComplete, setIsStudyComplete] = useState(false);

  const speak = useSpeechSynthesis();

  const handleLetterSelection = (letter) => {
    setSelectedLetter(letter);
    speak(letter);
  };

  const completeStudy = () => {
    setProgress((prevProgress) => prevProgress + 10);
    setRewards((prevRewards) => prevRewards + 1);
    const canvas = document.getElementById('studyCanvas');
    if (canvas) {
      setStudyImage(canvas.toDataURL());
    }
    setIsStudyComplete(true);
  };

  return {
    selectedLetter,
    progress,
    rewards,
    studyImage,
    isStudyComplete,
    handleLetterSelection,
    completeStudy,
  };
};

export default useLearning;
