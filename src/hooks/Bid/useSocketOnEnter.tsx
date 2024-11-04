import { createStandaloneToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketProps {
  auctionId: string | undefined;
  itemId: string | undefined;
}

const useSocketOnEnter = ({ auctionId, itemId }: SocketProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const baseURL = import.meta.env.VITE_APP_SOCKET_URL;
  const { toast } = createStandaloneToast();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!auctionId || !itemId) return undefined;

    const newSocket = io(`${baseURL}/auction-execute`);
    setSocket(newSocket);

    const sendAuctionId = {
      auctionId,
      itemId,
    };

    newSocket.emit('join_auction', sendAuctionId);

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
      setIsConnected(true);
    });

    return () => {
      socket?.disconnect();
      setSocket(null);
      setIsConnected(false);
      console.log('End Socket Connection!');
    };
  }, [auctionId]);

  return { socket, isConnected };
};

export default useSocketOnEnter;
