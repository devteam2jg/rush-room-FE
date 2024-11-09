import { Text } from '@chakra-ui/react';
import useSecondsToFormat from '../../hooks/Bid/useSecondsToFormat';

interface TimeProps {
  currentTime: number;
}

function BiddingSetRaceTime({ currentTime }: TimeProps) {
  const timeText = useSecondsToFormat({ currentTime, thirtyMatters: true });

  return currentTime > 30 ? (
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
      fontSize={{ base: '30px', sm: '42px' }}
      color="red"
    >
      {timeText}
    </Text>
  );
}

export default BiddingSetRaceTime;
