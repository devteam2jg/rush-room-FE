import { Box, Button, createStandaloneToast, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';

interface BiddingInTabProps {
  SetCurrentBid: (value: number) => void;
  socket: Socket;
}

function BiddingInTab({ socket, SetCurrentBid }: BiddingInTabProps) {
  const { auctionId } = useParams();
  const { toast } = createStandaloneToast();
  const [bid, setBid] = useState(0);

  useEffect(() => {
    socket.on('bid_updated', (newBid: number) => {
      setBid(newBid);
      SetCurrentBid(newBid);
      console.log('bid_updated', newBid);
    });

    return () => {
      socket.disconnect();
      console.log('End Connection from bidding');
    };
  }, [socket]);

  const handleSendBid = async () => {
    if (bid) {
      const bidForm = {
        auctionId,
        newCurrentBid: bid,
      };
      await socket.emit('new_bid', bidForm);
      console.log('bid_sent', bid);
    } else {
      toast({
        title: '실패',
        description: '문자를 입력해 주세요',
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateBid = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBid(Number(e.target.value));
  };

  return (
    <Box>
      <Input
        value={bid}
        onChange={handleUpdateBid}
        placeholder="입찰 금액을 정해주세요"
      />
      <Button onClick={handleSendBid}>123</Button>
    </Box>
  );
}

export default BiddingInTab;
