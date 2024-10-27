import {
  Box,
  Button,
  createStandaloneToast,
  Text,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';

interface BiddingInTabProps {
  currentPrice: number;
  socket: Socket | null;
}

function BiddingInTab({ currentPrice, socket }: BiddingInTabProps) {
  const { auctionId } = useParams();
  const { toast } = createStandaloneToast();
  const [bid, setBid] = useState<string>('');

  const handleSendBid = () => {
    if (bid) {
      const bidForm = {
        auctionId,
        newCurrentBid: Number(bid),
      };
      socket?.emit('new_bid', bidForm);
      console.log('bid_sent', bid);
      setBid('');
    } else {
      toast({
        title: '실패',
        description: '올바른 금액을 입력해 주세요',
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
      setBid('');
    }
  };

  const currentBudget = 100000;

  // Slider의 onChange는 직접 number 값을 받음
  const handleDragBid = (value: number) => {
    setBid(String(value));
  };

  return (
    <Box height="100%" display="flex" flexDirection="column" padding="20px">
      <Box flex="1">
        <Text mb="4" color="white">
          보유 금액: {currentBudget.toLocaleString()}원
        </Text>
        <Text mb="4" color="white">
          현재 경매가: {currentPrice.toLocaleString()}원
        </Text>
      </Box>

      <Box
        flex="2"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Slider
          onChange={handleDragBid}
          value={bid === '' ? 0 : Number(bid)}
          min={currentPrice}
          max={currentBudget}
          step={1000}
          mb="4"
        >
          <SliderTrack bg="#C2B4E2">
            <SliderFilledTrack bg="#996FD6" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <Text color="white" fontSize="lg" textAlign="center" mb="4">
          현재 입찰가:{' '}
          {bid ? `${Number(bid).toLocaleString()}원` : '입찰가를 정해주세요'}
        </Text>
      </Box>

      <Box flex="1" display="flex" alignItems="flex-end">
        <Button
          onClick={handleSendBid}
          width="100%"
          height="50px"
          backgroundColor="#B9A5E2"
          color="white"
        >
          입찰하기
        </Button>
      </Box>
    </Box>
  );
}

export default BiddingInTab;
