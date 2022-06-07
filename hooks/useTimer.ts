import { useCallback, useEffect, useState } from 'react';

type Timer = [number, { hours: string; minutes: string; seconds: string }];

export const useTimer = (startSeconds = 0): Timer => {
  const [seconds, setSeconds] = useState(startSeconds);

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const formatTimer = useCallback((totalSeconds) => {
    let seconds = String(totalSeconds % 60);
    let minutes = String(Math.floor((totalSeconds / 60) % 60));
    const hours = String(Math.floor((totalSeconds / 60 / 60) % 24));

    minutes = +minutes < 10 ? '0' + minutes : minutes;
    seconds = +seconds < 10 ? '0' + seconds : seconds;

    return {
      hours,
      minutes,
      seconds,
    };
  }, []);

  return [seconds, formatTimer(seconds)];
};
