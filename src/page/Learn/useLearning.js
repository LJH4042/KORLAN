import { useState } from 'react';

const useLearning = () => {
  const [selectedLetter, setSelectedLetter] = useState('');

  const handleLetterSelection = (letter) => {
    setSelectedLetter(letter);
  };

  const resetSelectedLetter = () => {
    setSelectedLetter('');
  };

  return {
    selectedLetter,
    handleLetterSelection,
    resetSelectedLetter,
  };
};

export default useLearning;