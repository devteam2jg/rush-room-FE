import {
  Avatar,
  Box,
  createStandaloneToast,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import useUserAuctionStats from '../hooks/useUserAuctionStats';

function UserGetItem() {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useUserAuctionStats();

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
    <Box
      overflow="hidden"
      width="100%"
      height="100%"
      p={4}
      bg="#222222"
      color="#FCFCFD"
      overflowY="auto"
      borderRadius="lg"
    >
      <VStack height="100%" spacing={4} align="stretch">
        <Heading as="h5" size="xm" color="#FCFCFD">
          <HStack width="100%" justifyContent="space-between">
            <Text>낙찰 물품 리스트</Text>
            <Text color="#9C9C9C" fontWeight="700" fontSize="18px">
              {data?.data?.length} 개
            </Text>
          </HStack>
        </Heading>
        <VStack
          gap={4}
          height="100%"
          overflow="auto"
          alignItems="center"
          width="100%"
          justifyContent="flex-start"
        >
          {data?.data?.length > 0 ? (
            data?.data.map((item) => (
              <HStack p={2} width="100%" justifyContent="space-between" gap={2}>
                <Avatar src={item.imageUrls[0]} />
                <Text>{item.title}</Text>
              </HStack>
            ))
          ) : (
            <Text>데이터가 없습니다.</Text>
          )}
        </VStack>
      </VStack>
    </Box>
  );
}
export default UserGetItem;
