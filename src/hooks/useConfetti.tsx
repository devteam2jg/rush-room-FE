import JSConfetti from 'js-confetti';
import { useEffect, useRef } from 'react';

const useConfetti = () => {
  const jsConfettiRef = useRef<JSConfetti | null>(null);

  const getConfetti = () => {
    if (!jsConfettiRef.current) {
      jsConfettiRef.current = new JSConfetti();
    }
    return jsConfettiRef.current;
  };

  useEffect(() => {
    return () => {
      console.log('지움');
      jsConfettiRef.current?.destroyCanvas();
      jsConfettiRef.current = null;
    };
  }, []);

  return { confetti: getConfetti() };
};

export default useConfetti;
