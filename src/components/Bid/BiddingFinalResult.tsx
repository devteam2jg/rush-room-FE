import { VStack, Text, Box, HStack } from '@chakra-ui/react';

function BiddingFinalResult() {
  return (
    <VStack
      alignItems="center"
      justifyContent="space-evenly"
      bg="#222222"
      height="calc(var(--vh, 1vh) * 100)"
      width="100%"
      color="white"
    >
      <VStack
        alignItems="center"
        height="50%"
        gap={3}
        justifyContent="space-between"
      >
        <Text fontWeight="700" fontSize={{ base: '16px', sm: '30px' }}>
          👀 경매 최종 결과 확인 👀
        </Text>
        <Box width={{ sm: '250px' }} height={{ sm: '250px' }}>
          <Text fontSize={{ base: '100px' }}>🎀</Text>
        </Box>

        <VStack>
          <Text fontWeight="700" fontSize={{ base: '16px', sm: '30px' }}>
            지압 슬리퍼 입찰자 : 정소연
          </Text>
          <Text fontWeight="700" fontSize={{ base: '16px', sm: '30px' }}>
            키보드 입찰자 : 정소연
          </Text>
        </VStack>
      </VStack>
    </VStack>
  );
}

export default BiddingFinalResult;
