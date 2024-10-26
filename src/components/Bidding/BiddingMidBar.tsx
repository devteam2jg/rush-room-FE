import { Flex, Text } from '@chakra-ui/react';

interface BiddingMidBarProps {
  currentBid: number;
}

function BiddingMidBar({ currentBid }: BiddingMidBarProps) {
  return (
    <Flex padding="0 3%" justifyContent="space-between">
      <h1>13: 38: 02</h1>
      <Flex>
        <Text fontSize="13px" fontWeight={700}>
          현재가
        </Text>
        <h1>{currentBid}</h1>
      </Flex>
    </Flex>
  );
}

export default BiddingMidBar;
