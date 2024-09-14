// useGoogleTTS.js
import axios from "axios";

const useGoogleTTS = () => {
  const speak = async (text) => {
    const response = await axios.post("http://localhost:5000/synthesize", {
      text,
    });
    const audioSrc = `data:audio/mp3;base64,${response.data.audioContent}`;
    const audio = new Audio(audioSrc);
    audio.play();
  };
  return speak;
};

export default useGoogleTTS;
