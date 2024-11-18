import {
  Badge,
  Box,
  HStack,
  Heading,
  Text,
  VStack,
  createStandaloneToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuction from '../hooks/useAuction';

function UserHostedAuction() {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useAuction(100);

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
      height="100%"
      width="100%"
      p={4}
      bg="#222222"
      color="#FCFCFD"
      overflowY="auto"
      borderRadius="lg"
    >
      <VStack height="100%" spacing={4} align="stretch">
        <Heading as="h5" size="xm" color="#FCFCFD">
          <HStack width="100%" justifyContent="space-between">
            <Text>주최 경매 리스트</Text>
            <Text color="#9C9C9C" fontWeight="700" fontSize="18px">
              {data?.pages[0].data.length} 개
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
          {data?.pages[0].data.length > 0 ? (
            data?.pages[0].data.map((item) => (
              <HStack p={2} width="100%" justifyContent="space-between" gap={2}>
                <Text isTruncated>제목 : {item?.auctionDto.title}</Text>
                <Badge
                  variant="subtle"
                  colorScheme={
                    item?.auctionDto.status === 'WAIT'
                      ? 'purple'
                      : item?.auctionDto.status === 'PROGRESS'
                        ? 'green'
                        : 'red'
                  }
                >
                  {item?.auctionDto.status}
                </Badge>
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
export default UserHostedAuction;
