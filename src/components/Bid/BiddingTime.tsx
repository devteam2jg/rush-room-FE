import { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import useSecondsToFormat from '../../hooks/Bid/useSecondsToFormat';
import useSocketStore from '../../store/useSocketStore';

type Time = {
  time: number;
};

function BiddingTime() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const timeText = useSecondsToFormat({ currentTime, thirtyMatters: false });
  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (!socket) return undefined;
    const handleTime = (timeData: Time) => {
      setCurrentTime(timeData.time);
    };
    socket?.on('TIME_UPDATE', handleTime);
    return () => {
      socket?.off('TIME_UPDATE', handleTime);
    };
  }, [socket]);

  return (
    <Text
      fontWeight="700"
      fontSize={{ base: '25px', sm: '30px' }}
      color={currentTime < 30 ? '#ff000d' : '#FDFDFC'}
    >
      {timeText}
    </Text>
  );
}

export default BiddingTime;
