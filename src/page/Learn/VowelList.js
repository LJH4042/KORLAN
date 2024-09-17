// VowelList.js
import React from "react";

const VowelList = ({ vowels, onLetterSelect, setIsCanvas }) => {
  return (
    <div>
      {vowels.map((vowel) => (
        <button
          key={vowel.id}
          onClick={() => {
            onLetterSelect(vowel.letter);
            setIsCanvas(false);
          }}
        >
          {vowel.letter}
        </button>
      ))}
    </div>
  );
};

export default VowelList;
