import { HStack, VStack, Text, CircularProgress } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

// 아이템을 위한 타입
interface AuctionOverviewItem {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  sellingLimitTime: number;
}

type AuctionItemsProps = {
  item: AuctionOverviewItem;
};

function AuctionOverviewItemList() {
  const { id } = useParams();
  const nav = useNavigate();
  const handleEnterAuctionOverview = () => {
    // 수정필요함
    nav(`/auction/${id}`);
  };
  return (
    <>
      <HStack
        width="100%"
        justifyContent="space-between"
        onClick={handleEnterAuctionOverview}
      >
        <VStack flex="2" gap={-10} alignItems="flex-start">
          <Text fontSize="15px" fontWeight={700}>
            정글 6기 수료 기념 애장품 경매
          </Text>
          <Text fontSize="13px">2024-10-17 14:00</Text>
        </VStack>
        <Text fontWeight={700} fontSize="18px" flex="1">
          진행중
          <CircularProgress isIndeterminate color="green.300" />
        </Text>
      </HStack>
      <HStack
        width="100%"
        justifyContent="space-between"
        onClick={handleEnterAuctionOverview}
      >
        <VStack flex="2" gap={-10} alignItems="flex-start">
          <Text fontSize="15px" fontWeight={700}>
            또요니네 100만 팬미팅 애장품 경매
          </Text>
          <Text fontSize="13px">2024-10-17 14:00</Text>
        </VStack>
        <Text fontWeight={700} fontSize="18px" flex="1">
          대기중
          <CircularProgress value={0} />
        </Text>
      </HStack>
      <HStack
        width="100%"
        justifyContent="space-between"
        onClick={handleEnterAuctionOverview}
      >
        <VStack flex="2" gap={-10} alignItems="flex-start">
          <Text fontSize="15px" fontWeight={700}>
            희귀 우표 컬렉션
          </Text>
          <Text fontSize="13px">2024-10-17 14:00</Text>
        </VStack>
        <Text fontWeight={700} fontSize="18px" flex="1">
          대기중
          <CircularProgress value={0} />
        </Text>
      </HStack>
    </>
  );
}

export default AuctionOverviewItemList;
