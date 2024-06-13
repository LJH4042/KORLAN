// useGoogleTTS.js
import { useState } from 'react';
import axios from 'axios';

const useGoogleTTS = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY;

  const speak = async (text) => {
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

    const data = {
      input: { text },
      voice: { languageCode: 'ko-KR', name: 'ko-KR-Standard-B' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const audioContent = response.data.audioContent;
      const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
      audio.play();
    } catch (error) {
      console.error('텍스트 음성 변환 중 오류 발생:', error);
    }
  };

  return speak;
};

export default useGoogleTTS;
