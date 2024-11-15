import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  createStandaloneToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuction from '../hooks/useAuction';
import SpringModal from './Modal/SpringModal';

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
            <Text fontSize="md">주최 경매 리스트</Text>
          </Flex>
          <Text>&gt;</Text>
        </Flex>
      </Button>

      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Box>
          <Text color="white">주최 경매 리스트</Text>
          {data.data.map((item: { auctionDto: Auction }) => (
            <VStack key={item.auctionDto.id}>{item.auctionDto.title}</VStack>
          ))}
          <Button onClick={() => setIsOpen(!isOpen)}>Close</Button>
        </Box>
      </SpringModal>
    </>
  );
}
export default UserHostedAuction;
