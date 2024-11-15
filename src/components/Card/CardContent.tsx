import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Result } from '../../utils/types';

interface CardContentProps {
  result: Result;
}

function CardContent({ result }: CardContentProps) {
  return (
    <Box height="100%" bg="#FCFCFD" position="relative">
      <Image
        width="100%"
        height="40vh"
        objectFit="cover"
        src={result.picture}
        pointerEvents="none"
      />

      <VStack position="relative" bg="#282828" zIndex={200}>
        <VStack p={{ base: 3, sm: 6 }} justifyContent="center" width="100%">
          <Avatar
            pointerEvents="none"
            zIndex={200}
            size={{ base: 'xl', sm: '2xl' }}
            src={result.bidder.profileUrl}
          />
        </VStack>
        <Image
          zIndex={50}
          top={-10}
          position="absolute"
          width="100%"
          objectFit="cover"
          src="/images/congrats.png"
          pointerEvents="none"
        />

        <Box zIndex={200} width="100%" p={{ base: 3, sm: 5 }}>
          <VStack
            justifyContent="center"
            borderRadius="15px"
            p={2}
            bg="#333333"
          >
            <HStack>
              <Text color="#B9A5E2" fontWeight="700">
                {result.bidder.name}
              </Text>
              <Text>님 께서</Text>
            </HStack>
            <HStack>
              <Text color="#FE9900" fontWeight="700">
                {result.title}
              </Text>
              <Text>를</Text>
            </HStack>
            <HStack>
              <Text
                fontSize={{ base: '18px', sm: '24px' }}
                fontWeight="700"
                color="#CB9428"
              >
                {result.bidPrice}
              </Text>
              <Text> 원 에 낙찰!</Text>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}

export default CardContent;
