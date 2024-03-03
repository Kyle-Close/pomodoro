import { useState, useEffect, useRef } from 'react';

export function useTimer(initialSeconds: number) {
  const intervalId = useRef<number | null>(null);
  const [isOn, setIsOn] = useState(false);
  const [timeInSecondsRemaining, setTimeInSecondsRemaining] = useState(initialSeconds);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (timeInSecondsRemaining === 0) {
      setIsCompleted(true);
    }
  }, [timeInSecondsRemaining]);

  function start() {
    if (!intervalId.current) {
      intervalId.current = setInterval(() => {
        setTimeInSecondsRemaining((prevTimeInSeconds) => prevTimeInSeconds - 1);
      }, 1000);
    }
    setIsOn(true);
  }

  function pause() {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      setIsOn(false);
    }
  }

  function reset(seconds: number) {
    pause();
    setIsCompleted(false);
    setTimeInSecondsRemaining(seconds);
  }

  const formatTime = (timeInSeconds: number) => {
    const date = new Date(timeInSeconds * 1000);
    const minutes = formatNumberToString(date.getMinutes());
    const seconds = formatNumberToString(date.getSeconds());
    return { minutes, seconds };
  };

  function formatNumberToString(number: number) {
    if (number < 10) {
      return '0' + number;
    } else return number.toString();
  }

  const { minutes, seconds } = formatTime(timeInSecondsRemaining);

  return {
    isCompleted,
    start,
    pause,
    isOn,
    timeInSecondsRemaining,
    reset,
    minutes,
    seconds,
  };
}
