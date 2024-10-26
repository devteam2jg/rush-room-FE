import { Flex, Text } from '@chakra-ui/react';

function BiddingMidBar() {
  return (
    <Flex padding="0 3%" justifyContent="space-between">
      <h1>13: 38: 02</h1>
      <Flex>
        <Text fontSize="13px" fontWeight={700}>
          현재가
        </Text>
        <h1>12341</h1>
      </Flex>
    </Flex>
  );
}

export default BiddingMidBar;
