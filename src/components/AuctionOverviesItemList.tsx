import { HStack, VStack, Text, CircularProgress } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

interface Auction {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  sellingLimitTime: number;
  status: string;
  isPrivate: boolean;
}

type AuctionProps = {
  item: Auction;
};

function AuctionOverviewItemList({ item }: AuctionProps) {
  const { auctionId } = useParams();
  const nav = useNavigate();

  const handleEnterAuctionOverview = () => {
    // 수정필요함
    nav(`/auction/${auctionId}`);
  };
  return (
    <HStack
      width="100%"
      justifyContent="space-between"
      onClick={handleEnterAuctionOverview}
    >
      <VStack flex="2" gap={-10} alignItems="flex-start">
        <Text fontSize="15px" fontWeight={700}>
          {item.title}
        </Text>
        <Text fontSize="13px">{item.eventDate}</Text>
      </VStack>
      <Text fontWeight={700} fontSize="18px" flex="1">
        {item.status}
        <CircularProgress isIndeterminate color="green.300" />
      </Text>
    </HStack>
  );
}

export default AuctionOverviewItemList;
