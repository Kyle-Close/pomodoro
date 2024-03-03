import { useEffect, useRef, useState } from 'react';
import JSConfetti from 'js-confetti';
import { useTimer } from '../timer/useTimer';

export type IntervalStack = { isBreak: boolean; time: number; isCompleted: boolean }[];

export function usePomodoro(intervalCount: number) {
  const DEFAULT_FOCUS_INTERVAL = 5; //25 * 60;
  const DEFAULT_BREAK_INTERVAL = 3; //5 * 60;
  const [intervalStack, setIntervalStack] = useState<IntervalStack>(buildInitialIntervalStack());
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(0);
  const timer = useTimer(DEFAULT_FOCUS_INTERVAL);

  useEffect(() => {
    if (isComplete()) {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
      const timeoutId = setTimeout(() => {
        jsConfetti.clearCanvas();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [intervalStack]);

  useEffect(() => {
    if (timer.isCompleted) {
      // set current interval to completed
      updateCompletedInterval(currentIntervalIndex);
      // create new timer with new interval time
      if (intervalStack.length - 1 > currentIntervalIndex) {
        console.log('inc interval index');
        timer.reset(intervalStack[currentIntervalIndex + 1].time);
        // increment currentIntervalIndex
        setCurrentIntervalIndex((prev) => prev + 1);
      }
    }
  }, [timer.isCompleted]);

  function isComplete() {
    return intervalStack.every((interval) => interval.isCompleted);
  }
  function updateCompletedInterval(index: number) {
    setIntervalStack((prev) => {
      const temp = [...prev];
      temp[index].isCompleted = true;
      return temp;
    });
  }
  function buildInitialIntervalStack() {
    const temp = [];
    for (let i = 0; i < intervalCount; i++) {
      temp.push({ isCompleted: false, isBreak: false, time: DEFAULT_FOCUS_INTERVAL });
      if (intervalCount - 1 !== i) {
        temp.push({ isCompleted: false, isBreak: true, time: DEFAULT_BREAK_INTERVAL });
      }
    }
    return temp;
  }

  function clearIntervalStack() {
    setIntervalStack([]);
  }

  const handleStartPauseClick = () => {
    if (timer.isOn) {
      timer.pause();
    } else {
      timer.start();
    }
  };

  function reset() {
    timer.pause();
    clearIntervalStack();
    buildInitialIntervalStack();
  }

  return {
    handleStartPauseClick,
    minutes: timer.minutes,
    seconds: timer.seconds,
    intervalCount,
    intervalStack,
    reset,
    isOn: timer.isOn,
  };
}
