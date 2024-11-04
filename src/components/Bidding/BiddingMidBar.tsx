import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface BiddingMidBarProps {
  currentPrice: number;
}

function BiddingMidBar({ currentPrice }: BiddingMidBarProps) {
  const [timeLeft, setTimeLeft] = useState(600); // 10분 = 600초

  useEffect(() => {
    if (timeLeft <= 0) return undefined; // 시간이 다 되면 중지
    const timer = setInterval(
      () => setTimeLeft((prevTime) => prevTime - 1),
      1000
    );

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [timeLeft]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <Flex
      backgroundColor="#141517"
      padding="2% 3%"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text
        letterSpacing="widest"
        color="white"
        fontSize="17px"
        fontWeight={700}
      >
        {formatTime(timeLeft)}
      </Text>
      <Flex gap="8px" justifyContent="center" alignContent="center">
        <Text color="white" fontSize="17px">
          현재가
        </Text>
        <Text
          letterSpacing="widest"
          color="#EFDA19"
          fontSize="17px"
          fontWeight={700}
        >
          {currentPrice.toLocaleString()}
        </Text>
      </Flex>
    </Flex>
  );
}

export default BiddingMidBar;
