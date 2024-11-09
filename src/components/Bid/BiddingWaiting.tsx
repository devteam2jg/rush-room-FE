import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { blinkAnimation } from './BiddingItemResult';

function BiddingWaiting() {
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
        <Text>다음 경매를 준비 중 이예요!</Text>
        <Text
          animation={`${blinkAnimation} 1.5s ease-in-out infinite`}
          fontWeight="700"
          fontSize={{ base: '150px', sm: '200px' }}
        >
          🙏
        </Text>
        <HStack>
          <Text
            fontSize={{ base: '16px', sm: '20px' }}
            color="#886CB5"
            fontWeight="700"
          >
            잠시만
          </Text>
          <Text>기다려 주시면 금방 넘어갈게요!</Text>
        </HStack>
      </VStack>

      <Box
        fontSize={{ base: '16px', sm: '20px' }}
        animation={`${blinkAnimation} 1.5s ease-in-out infinite`}
      >
        <Text>곧 다음 아이템 경매가 시작 됩니다..</Text>
      </Box>
    </VStack>
  );
}

export default BiddingWaiting;
