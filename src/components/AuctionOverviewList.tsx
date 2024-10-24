import { Box, createStandaloneToast, Heading, VStack } from '@chakra-ui/react';
import AuctionOverviewItemList from './AuctionOverviewItemList';
// import { useNavigate } from 'react-router-dom';
// import useAuctionDetail from '../hooks/useAuctionDetail';
// import AuctionOverviewItemList from './AuctionOverviewItemList';

interface Auction {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  sellingLimitTime: number;
}

export default function AuctionOverviewList() {
  //   const nav = useNavigate();
  //   const { toast } = createStandaloneToast();
  //   const { data, error, isPending } = useAuctionDetail();
  //   if (isPending) {
  //     return <div>Loading...!!</div>;
  //   }

  //   if (error) {
  //     nav('/');
  //     toast({
  //       title: '실패',
  //       description: `${error.message}`,
  //       status: 'error',
  //       variant: 'left-accent',
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }

  return (
    <Box p={4} textAlign="center" bg="white">
      <VStack spacing={4} align="flex-start">
        <Heading as="h5" size="xm" textAlign="left">
          경매 목록 리스트
        </Heading>
        {/* {data.items.map((item: Auction) => (
          <AuctionOverviewItemList key={item.id} item={item} /> */}
        {/* ))} */}
        <AuctionOverviewItemList />
      </VStack>
    </Box>
  );
}
