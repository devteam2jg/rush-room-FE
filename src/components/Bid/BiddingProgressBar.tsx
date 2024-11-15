import { Progress } from '@chakra-ui/react';

interface ProgressProps {
  runtime: number;
}

function BiddingProgressBar({ runtime }: ProgressProps) {
  return runtime <= 15 ? (
    <Progress
      borderRadius="5px"
      width="100%"
      height={{ base: '40px', sm: '50px' }}
      colorScheme="purple"
      backgroundColor="#B9A5E2"
      position="absolute"
      top={0}
      left={0}
      max={15}
      min={0}
      value={runtime <= 15 ? runtime : 15}
      size="lg"
      zIndex={1}
      hasStripe
      isAnimated
    />
  ) : null;
}

export default BiddingProgressBar;
