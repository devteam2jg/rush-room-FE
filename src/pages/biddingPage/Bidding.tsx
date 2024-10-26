import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { createStandaloneToast, Flex } from '@chakra-ui/react';
import BiddingSession from '../../components/Bidding/BiddingSession';
import useBitItemInfo from '../../hooks/useBidItemInfo';
import BiddingMidBar from '../../components/Bidding/BiddingMidBar';
import BiddingTab from '../../components/Bidding/BiddingTab';

function Bidding() {
  const baseURL = import.meta.env.VITE_APP_SOCKET_URL;
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const socket = io(`${baseURL}/auction-execute`);
  const { auctionId } = useParams();
  const { itemId } = useParams();
  const { data, error, isPending } = useBitItemInfo();

  if (isPending) {
    return <div>Loading....</div>;
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
    <Flex minHeight="100vh" flexDirection="column">
      <BiddingSession socket={socket} auctionId={auctionId} itemId={itemId} />
      <BiddingMidBar />
      <BiddingTab socket={socket} />
    </Flex>
  );
}

export default Bidding;