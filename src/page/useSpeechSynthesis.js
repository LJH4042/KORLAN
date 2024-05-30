import { useState, useEffect } from 'react';

const useSpeechSynthesis = () => {
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  useEffect(() => {
    const synthesis = window.speechSynthesis;
    setSpeechSynthesis(synthesis);
  }, []);

  const speak = (text) => {
    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return speak;
};

export default useSpeechSynthesis;
