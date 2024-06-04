import React, { useCallback, useEffect, useState } from "react";

function Timer({ setIsAuth, setIsFind }) {
  const [second, setSecond] = useState(0);
  const [minuts, setMinuts] = useState(3);

  const reduceSecond = () => setSecond((second) => Math.max(second - 1, 0));
  const reduceMinuts = () => setMinuts((minuts) => Math.max(minuts - 1, 0));

  const secondTimer = String(second).padStart(2, 0);
  const minutsTimer = String(minuts).padStart(2, 0);

  const timeDelay = useCallback(() => {
    setTimeout(() => {
      reduceMinuts();
      setSecond(59);
    }, 1000);
  }, []);

  useEffect(() => {
    const reduce = setInterval(reduceSecond, 1000);
    return () => clearInterval(reduce);
  });

  useEffect(() => {
    if (minuts === 0 && second === 0) {
      alert("인증코드를 다시 발급해주세요.");
      setIsAuth(false);
      setIsFind(true);
    } else if (second === 0) {
      timeDelay();
    }
  }, [minuts, second, timeDelay, setIsAuth, setIsFind]);

  return <span>{`${minutsTimer} : ${secondTimer}`}</span>;
}

export default Timer;
