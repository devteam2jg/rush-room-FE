import {
  Box,
  createStandaloneToast,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuction from '../hooks/useAuction';

function UserAuctionStats() {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useAuction();
  if (isPending) {
    return <div>Loading...!!</div>;
  }

  if (error) {
    nav('/');
    toast({
      title: '실패',
      description: `${error.message}`,
      status: 'error',
      variant: 'left-accent',
      duration: 3000,
      isClosable: true,
    });
  }
  return (
    <Box w="100%" p={6} backgroundColor="#222222">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold" color="white">
          경매 주최 횟수
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          {data.totalCount}
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <VStack bg="#282828" borderRadius="md" p={4} w="30%" align="center">
          <Text fontSize="sm" fontWeight="bold" color="white">
            낙찰
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="white">
            0
          </Text>
        </VStack>
        <VStack
          bg="#282828"
          borderRadius="md"
          p={4}
          w="30%"
          alignItems="center"
        >
          <Text fontSize="sm" fontWeight="bold" color="white">
            최고 금액 갱신
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="white">
            5
          </Text>
        </VStack>
        <VStack bg="#282828" borderRadius="md" p={4} w="30%">
          <Text fontSize="sm" fontWeight="bold" color="white">
            최고 금액 갱신
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="white">
            5
          </Text>
        </VStack>
      </Flex>
    </Box>
  );
}

export default UserAuctionStats;
