import {
  Avatar,
  Button,
  Flex,
  Text,
  HStack,
  VStack,
  Box,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuctionItem } from '../../utils/types';
import useFormatPrice from '../../hooks/Bid/useFormatPrice';

interface ItemProps {
  item: AuctionItem;
}

function BiddingItemInfo({ item }: ItemProps) {
  const { auctionId } = useParams();
  const nav = useNavigate();

  const handleDetail = () => {
    nav(`/auction/${auctionId}/details/${item.id}`);
  };
  return (
    <Box>
      <Flex
        padding="12px"
        justifyContent="space-between"
        width="100%"
        bg="#222222"
        color="#DADADA"
      >
        <HStack gap={{ base: '4', sm: '6' }}>
          <Avatar src={item.imageUrls[0]} />
          <VStack alignItems="flex-start">
            <Text
              isTruncated
              width={{ base: '60px', sm: '90px' }}
              fontSize={{ base: '14px', sm: '16px' }}
              fontWeight="700"
            >
              {item.title}
            </Text>
            <Text
              width={{ base: '70px', sm: '90px' }}
              isTruncated
              fontSize={{ base: '14px', sm: '16px' }}
            >
              {item.postedUser.nickname}
            </Text>
          </VStack>
        </HStack>
        <HStack justifyContent="space-between" gap={4}>
          <Text
            width={{ base: '80px', sm: '90px' }}
            fontSize={{ base: '16px', sm: '18px' }}
            isTruncated
          >
            {useFormatPrice(item.startPrice)}
          </Text>
          <Button
            fontSize={{ base: '12px', sm: '14px' }}
            colorScheme="mong"
            backgroundColor="#B9A5E2"
            color="#FCFCFD"
            padding="10px"
            height={{ base: '40px', sm: '50px' }}
            onClick={handleDetail}
          >
            상세보기
          </Button>
        </HStack>
      </Flex>
      <Box height="12px" />
    </Box>
  );
}

export default BiddingItemInfo;
