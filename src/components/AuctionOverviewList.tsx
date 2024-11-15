import {
  Box,
  createStandaloneToast,
  Divider,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuction from '../hooks/useAuction';
import AuctionOverviewItemList from './AuctionOverviewItem';

interface Auction {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  sellingLimitTime: number;
  status: string;
  // isPrivate: boolean;
}

export default function AuctionOverviewList() {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useAuction(100);
  console.log(data);
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
    <Box overflow="hidden" height="100%" p={4} textAlign="center" bg="#282828">
      <VStack height="100%" spacing={4} align="center">
        <Heading as="h5" size="xm" textAlign="left" color="white">
          경매 목록 리스트
        </Heading>
        <Divider />
        <VStack
          // gap={10}
          height="100%"
          overflow="auto"
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          {data?.pages[0].data?.map((item) => (
            <AuctionOverviewItemList
              auctionId={item.auctionDto.id}
              key={item.auctionDto.id}
              item={item.auctionDto}
            />
          ))}
        </VStack>
        <Box height="60px" />
      </VStack>
    </Box>
  );
}
