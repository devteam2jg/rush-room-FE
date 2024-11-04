import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import useSecondsToFormat from '../../hooks/Bid/useSecondsToFormat';

interface TimeProps {
  setResetTime: React.Dispatch<React.SetStateAction<boolean>>;
  resetTime: boolean;
  setRuntime: React.Dispatch<React.SetStateAction<number>>;
}

function BiddingSetRaceTime({
  setRuntime,
  resetTime,
  setResetTime,
}: TimeProps) {
  const [timeLeft, setTimeLeft] = useState(600);

  const timeText = useSecondsToFormat(timeLeft);

  useEffect(() => {
    if (resetTime) {
      setTimeLeft(30);
      setResetTime(false);
    }
  }, [resetTime]);

  useEffect(() => {
    if (timeLeft <= 30) {
      setRuntime(timeLeft);
      if (timeLeft === 0) {
        return undefined;
      }
    }
    const timer = setInterval(
      () => setTimeLeft((prevTime) => prevTime - 1),
      1000
    );

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [timeLeft]);

  return timeLeft > 30 ? (
    <Text
      textAlign="center"
      fontSize={{ base: '25px', sm: '30px' }}
      color="#FDFDFC"
    >
      {timeText}
    </Text>
  ) : (
    <Text
      textAlign="center"
      fontWeight="700"
      fontSize={{ base: '30px', sm: '40px' }}
      color="red"
    >
      {timeText}
    </Text>
  );
}

export default BiddingSetRaceTime;
