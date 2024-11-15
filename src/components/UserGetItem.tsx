import {
  Box,
  Button,
  createStandaloneToast,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useUserAuctionStats from '../hooks/useUserAuctionStats';
import SpringModal from './Modal/SpringModal';
import AuctionItemList from './AuctionItem/AuctionItemList';

interface AuctionItem {
  id: string;
  title: string;
  startPrice: number;
}

function UserGetItem() {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useUserAuctionStats();

  console.log('user--', data?.data);

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
      width="100%"
      height="100%"
      p={4}
      bg="#222222"
      color="white"
      overflowY="auto"
      borderRadius="lg"
    >
      <VStack height="100%" spacing={4} align="stretch">
        <Heading as="h5" size="xm" color="white">
          낙찰 물품 리스트
        </Heading>
        <VStack
          height="100%"
          overflow="auto"
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          {data?.data?.map((item) => (
            <AuctionItemList key={item.id} item={item} />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}
export default UserGetItem;
