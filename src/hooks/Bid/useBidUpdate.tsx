import { useEffect, useState } from 'react';
import { SocketProps } from '../../utils/types';

const useBidUpdate = ({ socket }: SocketProps) => {
  const [currentPrice, setCurrentPrice] = useState(0);
  const [bidder, setBidder] = useState('');

  useEffect(() => {
    if (!socket) return undefined;
    socket?.on('PRICE_UPDATE', (priceData) => {
      setCurrentPrice(priceData.bidPrice);
      setBidder(priceData.bidderNickname);
      console.log('PRICE_UPDATE');
    });
    return () => {
      socket?.off('PRICE_UPDATE');
      console.log('PRICE_UPDATE 소켓 끄기');
    };
  }, [socket]);
  return { currentPrice, bidder, setCurrentPrice };
};

export default useBidUpdate;
