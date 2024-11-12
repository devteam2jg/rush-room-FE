import { Box } from '@chakra-ui/react';
import { useEffect, useRef, memo, useCallback } from 'react';
import { PiSpeakerSimpleHighFill } from 'react-icons/pi';
import SpeakingStore from '../../store/SpeakingStore';

interface SpeakingIndicatorProps {
  analyser: AnalyserNode | null;
}

function SpeakingIndicator({ analyser }: SpeakingIndicatorProps) {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const previousStateRef = useRef<boolean>(false);
  const setIsSpeaking = SpeakingStore((state) => state.setIsSpeaking);

  const detectSound = useCallback(() => {
    if (!analyser || !indicatorRef.current) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    const average =
      dataArray.reduce((acc, value) => acc + value, 0) / dataArray.length;
    const threshold = 10;
    const isSpeaking = average > threshold;

    if (isSpeaking !== previousStateRef.current) {
      previousStateRef.current = isSpeaking;
      setIsSpeaking(isSpeaking);
    }

    if (indicatorRef.current) {
      indicatorRef.current.style.display = isSpeaking ? 'block' : 'none';
    }

    animationFrameRef.current = requestAnimationFrame(detectSound);
  }, [analyser, setIsSpeaking]);

  useEffect(() => {
    detectSound();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [detectSound]);

  return (
    <Box
      position="absolute"
      top="50%"
      left="10%"
      transform="translate(-50%, -50%)"
      ref={indicatorRef}
      display="none"
      fontSize={{ base: '24px', sm: '30px' }}
      color="red.500"
    >
      <PiSpeakerSimpleHighFill />
    </Box>
  );
}

export default memo(SpeakingIndicator);
