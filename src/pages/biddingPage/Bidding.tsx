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
  const { auctionId, itemId } = useParams();

  const { data, error, isPending } = useBidItemInfo();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleAskRecordPermission = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
  };

  useEffect(() => {
    // socket 초기화 및 연결
    // const newSocket = io(`${baseURL}/auction-execute`, {
    //   withCredentials: true,
    // });
    handleAskRecordPermission();
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
      const sendAuctionId = {
        auctionId,
        itemId,
      };
      newSocket.emit('join_auction', sendAuctionId);
    });

    newSocket.on('bid_updated', (newBid) => {
      setCurrentPrice(newBid.newCurrentBid);
    });

    newSocket.on('current_bid', (currentBid) => {
      setCurrentPrice(currentBid);
    });

    document.body.style.overflow = 'hidden';

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
      document.body.style.overflow = 'auto';
    };
  }, []);

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
