import { useEffect, useState } from 'react';
import { SocketProps } from '../../utils/types';

const useBidUpdate = ({ socket }: SocketProps) => {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [bidder, setBidder] = useState('');

  useEffect(() => {
    if (!socket) return undefined;
    socket?.on('bid_updated', (newBid) => {
      setCurrentPrice(newBid.newCurrentBid);
      setBidder(newBid.nickname);
      console.log('bid_updated');
    });
    return () => {
      socket?.off('bid_updated');
    };
  }, [socket]);
  return { currentPrice, bidder };
};

export default useBidUpdate;
