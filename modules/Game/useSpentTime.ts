import { useCallback, useEffect, useState } from 'react';

const formatSpentTime = (ms: number) => {
  return new Date(ms).toISOString().substring(11, 19);
};

export const useSpentTime = (startedAt: number) => {
  const getTimeDiff = useCallback(() => {
    return !isNaN(startedAt) && startedAt > 0 ? new Date().getTime() - startedAt : 0;
  }, [startedAt]);

  const [diff, setDiff] = useState(getTimeDiff);

  useEffect(() => {
    const interval = setInterval(() => {
      setDiff(getTimeDiff);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [getTimeDiff]);

  return formatSpentTime(diff);
};
