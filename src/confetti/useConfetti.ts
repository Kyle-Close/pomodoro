import JSConfetti from 'js-confetti';
import { useEffect, useRef } from 'react';

export function useConfetti() {
  const timeoutId = useRef<number | null>(null);
  const jsConfetti = new JSConfetti();

  function execute() {
    jsConfetti.addConfetti();

    timeoutId.current = window.setTimeout(() => {
      jsConfetti.clearCanvas();
    }, 3000);
  }

  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  return {
    execute,
  };
}
