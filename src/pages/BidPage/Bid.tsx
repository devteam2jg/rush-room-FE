import {
  Box,
  Container,
  createStandaloneToast,
  Flex,
  HStack,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdOutlineInfo } from 'react-icons/md';
import { IoListCircleOutline } from 'react-icons/io5';
import BiddingStream from '../../components/Bid/BiddingStream';
import BiddingChatting from '../../components/Bid/BiddingChatting';
import useOnEnterBid from '../../hooks/Bid/useOnEnterBid';
import BiddingTimePriceInfo from '../../components/Bid/BiddingTimePriceInfo';
import BiddingRaise from '../../components/Bid/BiddingRaise';
import BiddingInfo from '../../components/Bid/BiddingInfo';
import BiddingItemList from '../../components/Bid/BiddingItemList';
import useSocketStore from '../../store/useSocketStore';
import BiddingControlModalOnState from '../../components/Bid/BiddingControlModalOnState';
import useConnectOnEnter from '../../hooks/Bid/useConnectOnEnter';
import BidHeader from '../../components/Bid/BidHeader';
import BiddingTime from '../../components/Bid/BiddingTime';

function Bid() {
  const { auctionId } = useParams();
  useConnectOnEnter({ auctionId });
  const socket = useSocketStore((state) => state.socket);
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const { isConnected, initialInfo } = useOnEnterBid({ auctionId });

  const { toast } = createStandaloneToast();

  useEffect(() => {
    if (!socket) return undefined;

    socket.on('ALERT', (response) => {
      toast({
        title: '알람띄울거임',
        description: response.message,
        status: 'error',
        variant: 'left-accent',
        duration: 3000,
        isClosable: true,
      });
    });

    return () => {
      socket.off('ALERT');
    };
  }, [socket]);

  if (!isConnected) {
    return (
      <Flex
        height="calc(var(--vh, 1vh) * 100)"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box
      position="relative"
      width="100%"
      height="calc(var(--vh, 1vh) * 100)"
      overflow="hidden"
    >
      <Flex
        zIndex={1}
        position="relative"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Container
          position="relative"
          height="100%"
          padding={0}
          width="100%"
          maxW="container.md"
        >
          <BiddingControlModalOnState
            setOpen={setOpen}
            setInfoOpen={setInfoOpen}
            setItemOpen={setItemOpen}
          />

          <Box
            width="100%"
            height="100%"
            onClick={() => setIsVisible(!isVisible)}
            zIndex={0}
          >
            <BiddingStream />
          </Box>

          <BiddingRaise
            open={open}
            setOpen={setOpen}
            initialBudget={initialInfo?.budget}
            initialItemPrice={initialInfo?.bidPrice}
          />
          <BiddingInfo
            initialItemId={initialInfo?.itemId}
            infoOpen={infoOpen}
            setInfoOpen={setInfoOpen}
          />
          <BiddingItemList itemOpen={itemOpen} setItemOpen={setItemOpen} />
          <Box
            display={isVisible ? 'block' : 'none'}
            position="absolute"
            p={4}
            top={0}
            left={0}
            width="100%"
            bgGradient="linear(to-t, transparent, #141517 )"
          >
            <VStack justifyContent="center" alignItems="start">
              <BidHeader initialItemId={initialInfo?.itemId} />
              <HStack
                width="100%"
                alignItems="start"
                justifyContent="space-between"
              >
                <BiddingTimePriceInfo
                  initialItemPrice={initialInfo?.bidPrice}
                />
                <BiddingTime />
              </HStack>
            </VStack>
          </Box>
          <Box
            position="absolute"
            top="50%"
            right="12px"
            transform="translateY(-50%)"
            zIndex={1}
          >
            <Flex gap="50px" flexDirection="column">
              <Box
                fontSize={{ base: '35px', sm: '45px' }}
                color="white"
                onClick={() => setOpen(true)}
                cursor="pointer"
              >
                <RiMoneyDollarCircleLine />
              </Box>
              <Box
                fontSize={{ base: '35px', sm: '45px' }}
                color="white"
                onClick={() => setInfoOpen(!infoOpen)}
              >
                <MdOutlineInfo />
              </Box>
              <Box
                fontSize={{ base: '35px', sm: '45px' }}
                color="white"
                onClick={() => setItemOpen(!itemOpen)}
              >
                <IoListCircleOutline />
              </Box>
            </Flex>
          </Box>
          <Box
            display={isVisible ? 'block' : 'none'}
            bgGradient="linear(to-t, #141517, transparent)"
            height="40%"
            width="100%"
            position="absolute"
            bottom={0}
            left={0}
          >
            <BiddingChatting />
          </Box>
        </Container>
      </Flex>
    </Box>
  );
}

export default Bid;
