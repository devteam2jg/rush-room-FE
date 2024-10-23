import { HStack, VStack, Text, Button } from '@chakra-ui/react';

interface User {
  nickname: string;
  id: string;
  email: string;
  profileUrl: string;
  thumbnailUrl: string;
}

// 아이템을 위한 타입
interface Item {
  id: string;
  title: string;
  description: string;
  itemImages: string; // 이미지가 여러 개라면 string[]
  startPrice: number;
  lastPrice: number;
  isSold: boolean;
  buyerId: string;
  postedUser: User;
}

type ItemsProps = {
  item: Item;
};

function AuctionItemList({ item }: ItemsProps) {
  return (
    <HStack width="100%" justifyContent="space-between">
      <VStack flex="1.3" gap={-10} alignItems="flex-start">
        <Text fontSize="15px" fontWeight={700}>
          {item.title}
        </Text>
        <div>{item.postedUser.id.slice(1, 5)}</div>
      </VStack>
      <Text fontSize="xs" flex="0.7" fontWeight={700} textAlign="center">
        시작가
      </Text>
      <Text
        marginLeft="5px"
        fontWeight={700}
        fontSize="22px"
        flex="1.5"
        textAlign="start"
      >
        {item.startPrice}
      </Text>
      <Button
        backgroundColor="#AA8EBF"
        color="white"
        flex="0.5"
        textAlign="center"
      >
        <Text fontSize="xs">상세보기</Text>
      </Button>
    </HStack>
  );
}

export default AuctionItemList;
