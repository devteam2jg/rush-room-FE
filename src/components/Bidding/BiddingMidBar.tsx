import { Flex, Text } from '@chakra-ui/react';

interface BiddingMidBarProps {
  currentPrice: number;
}

function BiddingMidBar({ currentPrice }: BiddingMidBarProps) {
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
        12:54:30
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
