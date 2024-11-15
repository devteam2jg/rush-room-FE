import {
  Box,
  createStandaloneToast,
  Divider,
  Flex,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaCircleDollarToSlot } from 'react-icons/fa6';
import useAuction from '../hooks/useAuction';

function UserAuctionStats() {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useAuction(1000);

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

  const count = data?.pages[0].data.length;
  return (
    <Box w="100%" padding="20px">
      <Flex justifyContent="space-between" alignItems="center">
        <HStack gap={2}>
          <FaCircleDollarToSlot color="#FCFCFD" />
          <Text fontSize="15px" fontWeight="700" color="#FCFCFD">
            경매 주최 횟수
          </Text>
        </HStack>

        <Text fontSize="2xl" fontWeight="700" color="#FCFCFD">
          {count} 회
        </Text>
      </Flex>
      <Divider borderColor="#D7C6FB" />
    </Box>
  );
}

export default UserAuctionStats;
