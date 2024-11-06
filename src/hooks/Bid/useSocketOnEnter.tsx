import { createStandaloneToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import useAuthStore from '../../store/UserAuthStore';

interface SocketProps {
  auctionId: string | undefined;
}

interface ResponseType {
  itemId: string;
  time: number;
  bidPrice: number;
  bidderId: string;
}

const useSocketOnEnter = ({ auctionId }: SocketProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const baseURL = import.meta.env.VITE_APP_SOCKET_URL;
  const { toast } = createStandaloneToast();
  const [isConnected, setIsConnected] = useState(false);
  const [initialInfo, setInitialInfo] = useState<ResponseType>();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!auctionId) return undefined;

    const newSocket = io(`${baseURL}/auction-execute`);
    setSocket(newSocket);

    const sendAuctionId = {
      auctionId,
      userId: user?.id,
    };

    console.log('들어온사람', user?.id);
    console.log('들어온사람', user?.name);

    newSocket.emit('join_auction', sendAuctionId);

    const sendonEnter = {
      auctionId,
      type: null,
    };

    newSocket.emit('INFO', sendonEnter, (response: ResponseType) => {
      setInitialInfo(response);
    });

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
      socket?.off('connect');
      setSocket(null);
      setIsConnected(false);
      console.log('End Socket Connection!');
    };
  }, [auctionId]);

  return { socket, isConnected, initialInfo };
};

export default useSocketOnEnter;
