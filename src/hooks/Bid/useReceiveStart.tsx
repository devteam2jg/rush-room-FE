import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketProps } from '../../utils/types';

enum AuctionStatus {
  READY = 'READY',
  START = 'START',
  END = 'END',
  AUCTION_END = 'AUCTION_END',
  UNKNOWN = 'UNKNOWN',
}

interface WinnerProps {
  bidPrice: number;
  itemId: string;
  name: string | null;
  title: string;
  type: string;
}

const useReceiveStart = ({ socket }: SocketProps) => {
  const [receievedItemId, setReceievedItemId] = useState('');
  const [receievedItemPrice, setReceievedItemPrice] = useState(0);
  const [status, setStatus] = useState<AuctionStatus>(AuctionStatus.UNKNOWN);
  const [winnerInfo, setWinnerInfo] = useState<WinnerProps | null>(null);
  const [sellerId, setSellerId] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    if (!socket) return undefined;

    socket.on('NOTIFICATION', (response) => {
      const { type, itemId, bidPrice } = response;

      if (type === 'BID_READY') {
        setSellerId(response.sellerId);
        setStatus((prevStatus) =>
          prevStatus !== AuctionStatus.READY ? AuctionStatus.READY : prevStatus
        );
      } else if (type === 'BID_START') {
        setReceievedItemPrice(bidPrice);
        setReceievedItemId(itemId);
        setStatus((prevStatus) =>
          prevStatus !== AuctionStatus.START ? AuctionStatus.START : prevStatus
        );
      } else if (type === 'BID_END') {
        console.log('끝났단다', response);
        setWinnerInfo(response);
        setReceievedItemId(itemId);
        setStatus((prevStatus) =>
          prevStatus !== AuctionStatus.END ? AuctionStatus.END : prevStatus
        );
      } else if (type === 'AUCTION_END') {
        setStatus(AuctionStatus.AUCTION_END);
        nav('/');
      } else {
        setStatus(AuctionStatus.UNKNOWN);
      }
    });

    return () => {
      socket.off('NOTIFICATION');
    };
  }, [socket]);

  return { receievedItemId, receievedItemPrice, status, winnerInfo, sellerId };
};

export default useReceiveStart;
