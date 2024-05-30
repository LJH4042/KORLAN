// ConsonantButton.js
import React from 'react';

const ConsonantButton = ({ item, onLetterSelect }) => {
  return (
    <button onClick={() => onLetterSelect(item.letter)}>
      {item.letter}
    </button>
  );
};

export default ConsonantButton;
