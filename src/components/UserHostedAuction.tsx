import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  createStandaloneToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

function UserHostedAuction() {
  const [isOpen, setIsOpen] = useState(false);
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
    <Box
      overflow="hidden"
      height="100%"
      width="100%"
      p={4}
      bg="#222222"
      overflowY="auto"
      borderRadius="lg"
    >
      <VStack height="100%" spacing={4} align="stretch">
        <Heading as="h5" size="xm" color="white">
          주최 경매 리스트
        </Heading>
        <VStack
          height="100%"
          overflow="auto"
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          {data.data?.map((item) => (
            <AuctionOverviewItemList
              auctionId={item.auctionDto.id}
              key={item.auctionDto.id}
              item={item.auctionDto}
            />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}
export default UserHostedAuction;
