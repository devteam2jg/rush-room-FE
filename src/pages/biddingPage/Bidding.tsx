import { useNavigate, useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { createStandaloneToast, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import BiddingImage from '../../components/Bidding/BiddingImage';
import useBidItemInfo from '../../hooks/useBidItemInfo';
import BiddingMidBar from '../../components/Bidding/BiddingMidBar';
import BiddingTab from '../../components/Bidding/BiddingTab';

function Bidding() {
  const baseURL = import.meta.env.VITE_APP_SOCKET_URL;
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { auctionId } = useParams();
  // const { itemId } = useParams();
  const { data, error, isPending } = useBidItemInfo();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // socket 초기화 및 연결
    const newSocket = io(`${baseURL}/auction-execute`);
    setSocket(newSocket);

    // 연결 이벤트 리스너
    newSocket.on('connect', () => {
      toast({
        title: '입장',
        description: '채팅방에 입장하셨습니다.',
        status: 'success',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      newSocket.emit('join_auction', auctionId);
    });

    // 입찰가 업데이트 이벤트 리스너
    newSocket.on('bid_updated', (newBid) => {
      setCurrentPrice(newBid);
      console.log('bid_updated');
    });

    // 현재 입찰가 이벤트 리스너
    newSocket.on('current_bid', (currentBid) => {
      setCurrentPrice(currentBid);
    });

    document.body.style.overflow = 'hidden';

    // cleanup 함수
    return () => {
      if (newSocket) {
        newSocket.disconnect();
        console.log('End Connection from bidding');
      }
      document.body.style.overflow = 'auto';
    };
  }, []); // 필요한 의존성만 포함

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
    <Flex
      backgroundColor="#212326"
      flexDirection="column"
      height="calc(var(--vh, 1vh) * 100)"
    >
      <BiddingImage images={data?.imageUrls} />
      <BiddingMidBar currentPrice={currentPrice} />
      <Flex flex="1" overflow="hidden">
        <BiddingTab currentPrice={currentPrice} socket={socket} />
      </Flex>
    </Flex>
  );
}
export default Bidding;
