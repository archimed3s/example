const oneMinuteMs = 1000 * 60;
const oneHourMs = oneMinuteMs * 60;
const oneDayMs = oneHourMs * 24;

export const getRemainingTime = (to: Date) => {
  const endDate = to.getTime();
  const remaining = Math.max(endDate - Date.now(), 0);
  const days = Math.floor(remaining / oneDayMs);
  const hours = Math.floor((remaining - days * oneDayMs) / oneHourMs);
  const minutes = Math.floor((remaining - days * oneDayMs - hours * oneHourMs) / oneMinuteMs);
  return { days, hours, minutes };
};
