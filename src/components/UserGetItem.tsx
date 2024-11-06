import {
  Box,
  Button,
  createStandaloneToast,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useUserAuctionStats from '../hooks/useUserAuctionStats';
import SpringModal from './Modal/SpringModal';

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
    <>
      <Button>
        <Flex
          align="center"
          justify="space-between"
          p={4}
          borderRadius="md"
          onClick={() => setIsOpen(!isOpen)}
          cursor="pointer"
        >
          <Flex align="center">
            <Text fontSize="md">낙찰 물품 리스트</Text>
          </Flex>
          <Text>&gt;</Text>
        </Flex>
      </Button>

      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Box>
          <Text>낙찰 물품 리스트</Text>
          {data.data.map((item: AuctionItem) => (
            <VStack key={item.id}>{item.title}</VStack>
          ))}

          <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
        </Box>
      </SpringModal>
    </>
  );
}
export default UserGetItem;
