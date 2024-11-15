import {
  Box,
  createStandaloneToast,
  Divider,
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
    <Box w="100%" p={6}>
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <Text fontSize="lg" fontWeight="bold" color="white">
          경매 주최 횟수
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          {data.totalCount} 회
        </Text>
      </Flex>
      <Divider />
      {/* <Flex justifyContent="space-between" mt={4}>
        <VStack bg="#C9B0F1" borderRadius="md" p={3} w="30%" align="start">
          <Text fontSize="sm" fontWeight="bold" color="white">
            낙찰
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="white">
            {data.length}
          </Text>
        </VStack>
        <VStack
          bg="#C9B0F1"
          borderRadius="md"
          p={2}
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
        <VStack bg="#C9B0F1" borderRadius="md" p={2} w="30%">
          <Text fontSize="sm" fontWeight="bold" color="white">
            최고 금액 갱신
          </Text>
          <Text fontSize="lg" fontWeight="bold" color="white">
            5
          </Text>
        </VStack>
      </Flex> */}
    </Box>
  );
}

export default UserAuctionStats;
