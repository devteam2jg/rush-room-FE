import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Text } from '@chakra-ui/react';
import useSocketStore from '../../store/useSocketStore';

function BiddingRushTime() {
  const [isRushTime, setIsRushTime] = useState(false);
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (!socket) return undefined;
    const handleRushTime = (response: any) => {
      const { type } = response;
      if (type === 'RUSH_TIME') {
        setIsRushTime(true);
      } else if (type === 'BID_END') {
        setIsRushTime(false);
      }
    };
    socket.on('NOTIFICATION', handleRushTime);

    return () => {
      socket?.off('NOTIFICATION', handleRushTime);
      setIsRushTime(false);
    };
  }, [socket]);

  return (
    <Box
      position="absolute"
      top="25%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      {isRushTime ? (
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.1, 0.5],
          }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        >
          <Text color="red" fontSize="4xl" fontWeight="bolder">
            RUSH TIME
          </Text>
        </motion.div>
      ) : null}
    </Box>
  );
}

export default BiddingRushTime;
