// MyPage.js


import React, { useState } from 'react';

function MyPage() {
  // 사용자의 학습 진행 상황을 추적하는 상태 변수
  const [progress, setProgress] = useState(0);

  // 보상 시스템을 위한 상태 변수
  const [rewards, setRewards] = useState(0);

  // 진행 상황 업데이트 함수
  const updateProgress = (increment) => {
    setProgress(progress + increment);
  };

  return (
    <div>
      <h2>마이페이지</h2>
      <p>진행 상황: {progress}</p>
      <p>보상 포인트: {rewards}</p>
    </div>
  );
}

export default MyPage;
