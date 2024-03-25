export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${padZero(minutes)}:${padZero(seconds)}`;
};

export const padZero = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};