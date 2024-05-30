// VowelList.js
import React from 'react';

const VowelList = ({ vowels, onLetterSelect }) => {
  return (
    <div>
      {vowels.map((vowel) => (
        <button
          key={vowel.id}
          onClick={() => onLetterSelect(vowel.letter)}>
          {vowel.letter}
        </button>
      ))}
    </div>
  );
};

export default VowelList;
