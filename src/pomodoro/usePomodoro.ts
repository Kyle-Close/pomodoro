import { useRef, useState } from 'react';

export function usePomodoro() {
  const DEFAULT_START_TIME = 25 * 60;
  let intervalId = useRef<number | null>(null);
  const [timeInSeconds, setTimeInSeconds] = useState(DEFAULT_START_TIME);
  const [isOn, setIsOn] = useState(false);

  const start = () => {
    if (!intervalId.current) {
      intervalId.current = setInterval(() => {
        setTimeInSeconds((prevTimeInSeconds) => prevTimeInSeconds - 1);
      }, 1000);
    }
    setIsOn(true);
  };

  const pause = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      setIsOn(false);
    }
  };

  const handleStartPauseClick = () => {
    if (intervalId.current) {
      // timer is running
      pause();
    } else {
      // timer is off
      start();
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const date = new Date(timeInSeconds * 1000);
    const minutes = formatNumberToString(date.getMinutes());
    const seconds = formatNumberToString(date.getSeconds());
    return { minutes, seconds };
  };

  const formatNumberToString = (number: number) => {
    if (number < 10) {
      return '0' + number;
    } else return number.toString();
  };

  const reset = () => {
    pause();
    setTimeInSeconds(DEFAULT_START_TIME);
  };

  const { minutes, seconds } = formatTime(timeInSeconds);

  return {
    isOn,
    reset,
    handleStartPauseClick,
    minutes,
    seconds,
  };
}