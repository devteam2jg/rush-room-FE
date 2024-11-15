import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useSocketStore from '../../store/useSocketStore';

type Time = {
  time: number;
};

function BiddingFinalTime() {
  const [count, setCount] = useState<number | null>(null);
  const socket = useSocketStore((state) => state.socket);
  const [audio] = useState(new Audio('/sounds/not0.wav'));
  const [endAudio] = useState(new Audio('/sounds/is0.wav'));

  useEffect(() => {
    if (!socket) return undefined;
    const handleFinalTime = (timeData: Time) => {
      console.log('마지막 시간', timeData);
      setCount(timeData.time);
      if (timeData.time > 0) {
        audio.play().catch((error) => {
          console.error('오디오 재생 실패:', error);
        });
      } else {
        endAudio.play().catch((error) => {
          console.error('오디오 재생 실패:', error);
        });
      }
    };

    socket?.on('FINAL_TIME', handleFinalTime);

    return () => {
      socket?.off('FINAL_TIME', handleFinalTime);
    };
  }, [socket]);

  if (count === null) return null;

  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <motion.div
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          backgroundColor: 'transparent',
          fontSize: '7rem',
          color: '#FF5722',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(var(--vh, 1vh) * 100)',
          fontWeight: 'bolder',
        }}
      >
        {count > 0 ? (
          <motion.span
            key={count}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {count}
          </motion.span>
        ) : null}
      </motion.div>
    </Box>
  );
}

export default BiddingFinalTime;
