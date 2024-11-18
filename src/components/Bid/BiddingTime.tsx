import { useEffect, useState, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import {
  Stat,
  StatGroup,
  StatNumber,
  Text,
  Box,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import useSecondsToFormat from '../../hooks/Bid/useSecondsToFormat';
import useSocketStore from '../../store/useSocketStore';

function BiddingTime() {
  const [currentTime, setCurrentTime] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [addDiffer, setAddDiffer] = useState(0);
  const [subDiffer, setSubDiffer] = useState(0);
  const socket = useSocketStore((state) => state.socket);
  const [displayTime, setDisplayTime] = useState(currentTime);
  const previousTime = useRef(currentTime);

  const timeText = useSecondsToFormat({
    currentTime: displayTime,
    thirtyMatters: false,
  });

  useEffect(() => {
    if (!socket) return undefined;

    const handleTime = (timeData) => {
      previousTime.current = currentTime;
      setCurrentTime(timeData.time);

      animate(previousTime.current, timeData.time, {
        duration: 0.5,
        ease: timeData.time < previousTime.current ? 'easeIn' : 'easeOut',
        onUpdate: (latest) => setDisplayTime(Math.round(latest)),
        onComplete: () => {
          setAddDiffer(0);
          setSubDiffer(0);
        },
      });
    };

    const handleAnimate = (response) => {
      setAnimationKey((prev) => prev + 1);
      const { type, differ } = response;
      if (type === 'ADD') {
        setAddDiffer(differ);
      } else if (type === 'SUB') {
        setSubDiffer(differ);
      }
    };

    socket?.on('TIME_UPDATE', handleTime);
    socket?.on('TIME', handleAnimate);

    return () => {
      socket?.off('TIME_UPDATE', handleTime);
      socket?.off('TIME', handleAnimate);
    };
  }, [socket, currentTime]);

  return (
    <div className="flex flex-col items-end gap-1.5">
      <Text
        fontWeight="700"
        fontSize={{ base: '15px', sm: '20px' }}
        color="#FCFCFD"
      >
        현재 경매 시간
      </Text>
      <div className="font-bold text-2xl md:text-3xl">
        <StatGroup>
          <Stat>
            <motion.div
              key={animationKey}
              initial={{ opacity: 0, scale: 3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <StatNumber
                color={`${displayTime < 30 ? 'red' : 'white'}`}
                fontSize={{ base: '23px', sm: '28px' }}
              >
                {timeText}
              </StatNumber>

              <StatHelpText
                fontWeight="700"
                fontSize={{ base: '10px', sm: '20px' }}
              >
                {addDiffer ? (
                  <Box color="green">
                    <StatArrow type="increase" />
                    {addDiffer} 초
                  </Box>
                ) : null}
                {subDiffer ? (
                  <Box color="red">
                    <StatArrow type="decrease" />
                    {subDiffer} 초
                  </Box>
                ) : null}
              </StatHelpText>
            </motion.div>
          </Stat>
        </StatGroup>
      </div>
    </div>
  );
}

export default BiddingTime;
