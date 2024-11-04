import {
  Box,
  Button,
  createStandaloneToast,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BiTimer } from 'react-icons/bi';
import { SocketProps } from '../../utils/types';
import useAuthStore from '../../store/UserAuthStore';
import BiddingSetRaceTime from './BiddingSetRaceTime';
import BiddingProgressBar from './BiddingProgressBar';
import BiddingPercentageRaise from './BiddingPercentageRaise';
import BiddingSliderBar from './BiddingSliderBar';
import DragCloseDrawer from '../Drawer/DragCloseDrawer';

interface RaiseProps extends SocketProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  originalPrice: number;
  currentPrice: number;
}

function BiddingRaise({
  socket,
  currentPrice,
  originalPrice,
  open,
  setOpen,
}: RaiseProps) {
  const { auctionId } = useParams();
  const { toast } = createStandaloneToast();
  const [bid, setBid] = useState<string>('');
  const { user } = useAuthStore((state) => state);
  const [runtime, setRuntime] = useState(0);
  const [resetTime, setResetTime] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setRuntime(0);
  }, [open]);

  const handleSendBid = () => {
    if (bid) {
      setResetTime(true);
      const bidForm = {
        auctionId,
        newCurrentBid: Number(bid),
        nickname: user?.name,
      };
      socket?.emit('new_bid', bidForm);
      console.log('bid_sent', bid);
    } else {
      toast({
        title: '실패',
        description: '올바른 금액을 입력해 주세요',
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
    }
    setBid('');
  };

  const currentBudget = 100000;

  return (
    <DragCloseDrawer
      h="h-full"
      heightValue="50vh"
      open={open}
      setOpen={setOpen}
    >
      <VStack width="100%" height="100%">
        <HStack
          fontSize={{ base: '15px', sm: '20px' }}
          justifyContent="space-between"
          color="#FCFCFD"
        >
          <HStack>
            <Text>현재 경매가</Text>
            <Text fontWeight="700" color="#FF8C00">
              {currentPrice
                ? currentPrice.toLocaleString()
                : originalPrice.toLocaleString()}{' '}
              원
            </Text>
          </HStack>
          <HStack>
            <Text>보유 크레딧 </Text>
            <Text fontWeight="700" color="#F1D849">
              {currentBudget.toLocaleString()} 원
            </Text>
          </HStack>
        </HStack>

        <VStack
          borderTop="1px solid #494949"
          bg="#222222"
          padding="12px"
          width="100%"
          height="100%"
          justifyContent="space-around"
        >
          <BiddingSliderBar
            bid={bid}
            setBid={setBid}
            currentPrice={currentPrice}
            originalPrice={originalPrice}
            currentBudget={currentBudget}
          />
          <BiddingSetRaceTime
            setResetTime={setResetTime}
            resetTime={resetTime}
            setRuntime={setRuntime}
          />
          {!runtime ? (
            <Box width="100%">
              <Button
                width="100%"
                height={{ base: '30px', sm: '45px' }}
                colorScheme="red"
                onClick={() => setIsOpen(!isOpen)}
              >
                <BiTimer />
              </Button>
              <BiddingPercentageRaise isOpen={isOpen} setIsOpen={setIsOpen} />
            </Box>
          ) : null}

          <Box position="relative" width="100%">
            <BiddingProgressBar runtime={runtime} />
            <Button
              disabled={!runtime}
              onClick={handleSendBid}
              width="100%"
              height={{ base: '30px', sm: '45px' }}
              colorScheme={runtime > 30 ? 'mong' : 'transparent'}
              color="#FDFDFC"
              zIndex={2}
            >
              입찰하기
            </Button>
          </Box>
        </VStack>
      </VStack>
    </DragCloseDrawer>
  );
}

export default BiddingRaise;
