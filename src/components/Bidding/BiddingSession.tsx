import { Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { Image } from '@chakra-ui/react';

interface BiddingProp {
  socket: Socket;
  auctionId: string | undefined;
  itemId: string | undefined;
}

function BiddingSession({ socket, auctionId, itemId }: BiddingProp) {
  useEffect(() => {
    console.log('auctionId : ', auctionId);
    console.log('itemId : ', itemId);
  });
  return (
    <div>
      <Image src="/images/biditem.png" />
    </div>
  );
}

export default BiddingSession;
