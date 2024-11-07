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
  isPrivate: boolean;
}

export default function AuctionOverviewList() {
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
    <Box height="100%" p={4} textAlign="center" bg="#282828">
      <VStack spacing={4} align="flex-start">
        <Heading as="h5" size="xm" textAlign="left" color="white">
          경매 목록 리스트
        </Heading>
        <Divider />
        {data.data.map((item: { auctionDto: Auction }) => (
          <AuctionOverviewItemList
            auctionId={item.auctionDto.id}
            key={item.auctionDto.id}
            item={item.auctionDto}
          />
        ))}
      </VStack>
    </Box>
  );
}
