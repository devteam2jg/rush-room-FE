import { HStack, VStack, Text, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface Auction {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  sellingLimitTime: number;
  status: string;
  // isPrivate: boolean;
}

type AuctionProps = {
  item: Auction;
  auctionId: string;
};

function AuctionOverviewItem({ item, auctionId }: AuctionProps) {
  const nav = useNavigate();

  const handleEnterAuctionOverview = () => {
    nav(`/auction/${auctionId}`);
  };

  const date = new Date(item.eventDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return (
    <Box p={2} width="100%">
      <HStack
        width="100%"
        justifyContent="space-between"
        onClick={handleEnterAuctionOverview}
        color="white"
      >
        <VStack gap={2} alignItems="flex-start">
          <Text fontSize="15px" fontWeight={700}>
            {item.title}
          </Text>
          <Text fontSize="13px">{`${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`}</Text>
        </VStack>
        <Text fontWeight={700} fontSize="18px">
          {item.status}
        </Text>
      </HStack>
      <Box marginTop="12px" width="100%" height="12px" bg="#222222" />
    </Box>
  );
}

export default AuctionOverviewItem;
