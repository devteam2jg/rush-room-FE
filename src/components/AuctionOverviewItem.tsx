import { HStack, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

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
  auctionId: string;
};

function AuctionOverviewItem({ item, auctionId }: AuctionProps) {
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
      </Text>
    </HStack>
  );
}

export default AuctionOverviewItem;
