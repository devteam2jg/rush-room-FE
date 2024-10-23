import { Box, createStandaloneToast, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuctionDetail from '../hooks/useAuctionDetail';
import AuctionItemList from './AuctionItem/AuctionItemList';

interface User {
  nickname: string;
  id: string;
  email: string;
  profileUrl: string;
  thumbnailUrl: string;
}

interface AuctionItem {
  id: string;
  title: string;
  description: string;
  itemImages: string;
  startPrice: number;
  lastPrice: number;
  isSold: boolean;
  buyerId: string;
  postedUser: User;
}

export default function AuctionList() {
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useAuctionDetail();
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
    <Box p={4} textAlign="center" bg="white">
      <VStack spacing={4} align="flex-start">
        <Heading as="h5" size="xm" textAlign="left">
          경매 물품 리스트
        </Heading>
        {data.items.map((item: AuctionItem) => (
          <AuctionItemList key={item.id} item={item} />
        ))}
      </VStack>
    </Box>
  );
}
