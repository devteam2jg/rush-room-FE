import JSConfetti from 'js-confetti';
import { useEffect, useRef } from 'react';

const useConfetti = () => {
  const jsConfettiRef = useRef<JSConfetti | null>(null);
  useEffect(() => {
    jsConfettiRef.current = new JSConfetti();

    return () => {
      jsConfettiRef.current?.destroyCanvas();
      jsConfettiRef.current = null;
    };
  }, []);
  return { confetti: jsConfettiRef.current };
};

export default useConfetti;
