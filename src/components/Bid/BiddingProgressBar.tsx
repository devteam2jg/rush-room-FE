import { Progress } from '@chakra-ui/react';

interface ProgressProps {
  runtime: number;
}

function BiddingProgressBar({ runtime }: ProgressProps) {
  return runtime <= 30 ? (
    <Progress
      borderRadius="5px"
      width="100%"
      height={{ base: '30px', sm: '45px' }}
      colorScheme="purple"
      backgroundColor="#B9A5E2"
      position="absolute"
      top={0}
      left={0}
      max={30}
      min={0}
      value={runtime <= 30 ? runtime : 30}
      size="lg"
      zIndex={1}
      hasStripe
      isAnimated
    />
  ) : null;
}

export default BiddingProgressBar;
