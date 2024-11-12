import { useEffect, useRef, memo } from 'react';
import SpeakingStore from '../../store/SpeakingStore';

interface AudioControllerProps {
  audioPool: HTMLAudioElement[];
}

const VOLUME_RESTORE_DELAY = 1000; // ms

const AudioVolumeController = memo(({ audioPool }: AudioControllerProps) => {
  const isSpeaking = SpeakingStore((state) => state.isSpeaking);
  const prevSpeakingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (audioPool.length > 0) {
      if (prevSpeakingRef.current !== isSpeaking) {
        if (isSpeaking) {
          audioPool.forEach((audio) => {
            audio.volume = 0.02;
          });
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
        } else {
          timerRef.current = setTimeout(() => {
            audioPool.forEach((audio) => {
              audio.volume = 0.3;
            });
          }, VOLUME_RESTORE_DELAY);
        }
        prevSpeakingRef.current = isSpeaking;
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isSpeaking, audioPool]);

  return null;
});

export default AudioVolumeController;
