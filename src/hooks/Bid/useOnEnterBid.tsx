import { useEffect, useState } from 'react';
import useAuthStore from '../../store/UserAuthStore';
import useSocketStore from '../../store/useSocketStore';

interface SocketProps {
  auctionId: string | undefined;
}

interface ResponseType {
  itemId: string;
  time: number;
  bidPrice: number;
  bidderId: string;
  budget: number;
}

const useOnEnterBid = ({ auctionId }: SocketProps) => {
  const socket = useSocketStore((state) => state.socket);
  const [isConnected, setIsConnected] = useState(false);
  const [initialInfo, setInitialInfo] = useState<ResponseType>();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!auctionId) return undefined;

    if (socket) {
      const sendEnterInfo = {
        auctionId,
        userId: user?.id,
      };

      const sendInfoRequest = {
        auctionId,
        type: 'INFO',
        userId: user?.id,
      };

      const handleInfoRequest = (response: ResponseType) => {
        if (response) {
          setIsConnected(true);
          setInitialInfo(response);
        }
      };

      socket.emit('JOIN', sendEnterInfo);

      socket.emit('CONTEXT', sendInfoRequest, handleInfoRequest);
    }

    return () => {
      setIsConnected(false);
    };
  }, [auctionId, socket]);

  return { isConnected, initialInfo };
};

export default useOnEnterBid;
