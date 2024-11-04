import { useEffect, useState } from 'react';
import { SocketProps } from '../../utils/types';

const usePriceOnEnter = ({ socket }: SocketProps) => {
  const [originalPrice, setOriginalPrice] = useState(0);

  useEffect(() => {
    if (!socket) return undefined;
    console.log('이거보세요', socket?.id);
    if (socket) {
      socket?.on('current_bid', (currentBid) => {
        setOriginalPrice(currentBid);
      });
      console.log('original Price Set');
    }

    return () => {
      socket?.off('current_bid');
      console.log('끌게?');
    };
  }, [socket]);

  console.log('줄떄', originalPrice);

  return originalPrice;
};

export default usePriceOnEnter;
