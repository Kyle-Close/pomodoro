import { useConfetti } from '../confetti/useConfetti';
import { useEffect, useState } from 'react';
import { useTimer } from '../timer/useTimer';

export type IntervalStack = { isBreak: boolean; time: number; isCompleted: boolean }[];

export function usePomodoro(intervalCount: number) {
  const DEFAULT_FOCUS_INTERVAL = 5; //25 * 60;
  const DEFAULT_BREAK_INTERVAL = 3; //5 * 60;
  const [intervalStack, setIntervalStack] = useState<IntervalStack>(buildInitialIntervalStack());
  const [currentIntervalIndex, setCurrentIntervalIndex] = useState(0);
  const [isCompletedIntervals, setIsCompletedIntervals] = useState(false);
  const timer = useTimer(DEFAULT_FOCUS_INTERVAL);
  const confetti = useConfetti();

  useEffect(() => {
    if (isComplete()) {
      confetti.execute();
      timer.reset(DEFAULT_FOCUS_INTERVAL);
      setIsCompletedIntervals(true);
    }
  }, [intervalStack]);

  useEffect(() => {
    if (timer.isCompleted) {
      updateCompletedInterval(currentIntervalIndex);
      if (intervalStack.length - 1 > currentIntervalIndex) {
        timer.reset(intervalStack[currentIntervalIndex + 1].time);
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

  const handleStartPauseClick = () => {
    if (timer.isOn) {
      timer.pause();
    } else {
      timer.start();
    }
  };

  function reset() {
    timer.pause();
    setIntervalStack(buildInitialIntervalStack());
    setCurrentIntervalIndex(0);
    setIsCompletedIntervals(false);
  }

  return {
    handleStartPauseClick,
    minutes: timer.minutes,
    seconds: timer.seconds,
    intervalCount,
    intervalStack,
    reset,
    isOn: timer.isOn,
    isCompletedIntervals,
  };
}
