import {
  Box,
  Button,
  createStandaloneToast,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import { useParams } from 'react-router-dom';

import { BiTimer } from 'react-icons/bi';
import { SocketProps } from '../../utils/types';
import useAuthStore from '../../store/UserAuthStore';
import BiddingSetRaceTime from './BiddingSetRaceTime';
import BiddingProgressBar from './BiddingProgressBar';
// import BiddingPercentageRaise from './BiddingPercentageRaise';
import DragCloseDrawer from '../Drawer/DragCloseDrawer';
import useCurrentTime from '../../hooks/Bid/useCurrentTime';

interface RaiseProps extends SocketProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  priceOfItem: number;
}

function BiddingRaise({ socket, priceOfItem, open, setOpen }: RaiseProps) {
  const currentBudget = 300000;
  const { auctionId } = useParams();
  const { toast } = createStandaloneToast();
  // const [bid, setBid] = useState<string>('');
  const { user } = useAuthStore((state) => state);
  // const [isOpen, setIsOpen] = useState(false);
  const currentTime = useCurrentTime({ socket });

  const digitCount = Math.floor(Math.log10(priceOfItem) + 1);
  const minRange = 10 ** (digitCount - 1) * 0.1;
  const maxRange = (10 ** digitCount / 2) * 0.5;

  // const handleSendBid = () => {
  //   // setBid('');
  // };

  const handleMinRaise = () => {
    const bid = priceOfItem + minRange;
    console.log('이거 보낼랑께', bid);
    if (Number(bid) > currentBudget) {
      toast({
        title: '실패',
        description: '예산을 초과했습니다',
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
    }
    if (bid) {
      const bidForm = {
        auctionId,
        bidPrice: Number(bid),
        bidderId: user?.id,
        bidderNickname: user?.name,
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
  };

  const handleMaxRaise = () => {
    const bid = priceOfItem + maxRange;
    console.log('이거 보낼랑께', bid);
    if (Number(bid) > currentBudget) {
      toast({
        title: '실패',
        description: '예산을 초과했습니다',
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
    }
    if (bid) {
      const bidForm = {
        auctionId,
        bidPrice: Number(bid),
        bidderId: user?.id,
        bidderNickname: user?.name,
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
  };

  return (
    <DragCloseDrawer
      h="h-full"
      heightValue="50vh"
      open={open}
      setOpen={setOpen}
    >
      <VStack
        borderTop="1px solid #494949"
        bg="#222222"
        padding="12px"
        width="100%"
        height="100%"
        justifyContent="space-around"
      >
        <VStack
          marginTop="20px"
          fontSize={{ base: '18px', sm: '20px' }}
          justifyContent="space-between"
          color="#FCFCFD"
        >
          <HStack justifyContent="space-between" width={{ base: '220px' }}>
            <Text>보유 크레딧 </Text>
            <Text fontWeight="700" color="#F1D849">
              {currentBudget.toLocaleString()} 원
            </Text>
          </HStack>
          <HStack justifyContent="space-between" width={{ base: '220px' }}>
            <Text>현재 경매가</Text>
            <Text fontWeight="700" color="#FF8C00">
              {priceOfItem.toLocaleString()}원
            </Text>
          </HStack>
        </VStack>
        <BiddingSetRaceTime currentTime={currentTime.currentTime} />
        {currentTime.currentTime > 30 ? (
          <Box width="100%">
            <Button
              width="100%"
              height={{ base: '40px', sm: '50px' }}
              colorScheme="red"
              onClick={handleMaxRaise}
            >
              <Flex alignItems="center" gap="12px">
                <Box display={{ base: 'none', sm: 'block' }}>
                  <BiTimer fontSize="30px" />
                </Box>
                <Box display={{ base: 'block', sm: 'none' }}>
                  <BiTimer fontSize="20px" />
                </Box>
                <Text>{maxRange}</Text>
              </Flex>
            </Button>
          </Box>
        ) : null}

        <Box position="relative" width="100%">
          <BiddingProgressBar runtime={currentTime.currentTime} />
          <Button
            onClick={handleMinRaise}
            width="100%"
            height={{ base: '40px', sm: '50px' }}
            colorScheme={currentTime.currentTime > 30 ? 'mong' : 'transparent'}
            color="#FDFDFC"
            zIndex={2}
          >
            입찰하기 {minRange}
          </Button>
        </Box>
      </VStack>
    </DragCloseDrawer>
  );
}

export default BiddingRaise;
