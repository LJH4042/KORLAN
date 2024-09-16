import React from "react";
import ConsonantButton from "./ConsonantButton";

const ConsonantList = ({ consonants, onLetterSelect, setIsCanvas }) => {
  return (
    <div className="Consonant">
      {consonants.map((item) => (
        <ConsonantButton
          key={item.id}
          item={item}
          onLetterSelect={onLetterSelect}
          setIsCanvas={setIsCanvas}
        />
      ))}
    </div>
  );
};

export default ConsonantList;
