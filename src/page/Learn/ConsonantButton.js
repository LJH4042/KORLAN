// ConsonantButton.js
import React from "react";

const ConsonantButton = ({ item, onLetterSelect, setIsCanvas }) => {
  return (
    <button
      onClick={() => {
        onLetterSelect(item.letter);
        setIsCanvas(false);
      }}
    >
      {item.letter}
    </button>
  );
};

export default ConsonantButton;
