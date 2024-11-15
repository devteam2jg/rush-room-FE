import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import SwipeCards from '../Card/SwipeCards';

type BidderData = {
  name: string;
  profileUrl: string;
};

type ResultData = {
  title: string;
  bidPrice: number;
  bidder: BidderData;
};

interface ResultInfo {
  resultInfo: ResultData[];
}

function BiddingResult({ resultInfo }: ResultInfo) {
  console.log('resultInfo', resultInfo);
  const resultsWithIds = resultInfo?.map((result, index) => ({
    ...result,
    id: index + 1,
  }));
  console.log('resultsWithIds', resultsWithIds);
  return (
    <VStack
      alignItems="center"
      justifyContent="space-evenly"
      bg="#161617"
      height="calc(var(--vh, 1vh) * 100)"
      width="100%"
      color="white"
    >
      <VStack gap="0" height="100%" width="100%" bg="#282828">
        <HStack
          width="100%"
          justifyContent="space-evenly"
          fontWeight="700"
          fontSize={{ sm: '25px' }}
          height={{ base: '50px', sm: '60px' }}
        >
          <Text>🎉 </Text>
          <Text>경매 낙찰 결과</Text>
          <Text> 🎉</Text>
        </HStack>
        <SwipeCards resultsWithIds={resultsWithIds} />
      </VStack>
    </VStack>
  );
}
export default BiddingResult;
