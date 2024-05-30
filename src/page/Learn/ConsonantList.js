import React from 'react';
import ConsonantButton from './ConsonantButton';

const ConsonantList = ({ consonants, onLetterSelect }) => {
  return (
    <div className="Consonant">
      {consonants.map((item) => (
        <ConsonantButton key={item.id}
          item={item}
          onLetterSelect={onLetterSelect} />
      ))}
    </div>
  );
};

export default ConsonantList;
