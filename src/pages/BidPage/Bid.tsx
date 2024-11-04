import { Box, Container, Flex, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdOutlineInfo } from 'react-icons/md';
import { IoListCircleOutline } from 'react-icons/io5';
import BiddingStream from '../../components/Bid/BiddingStream';
import BiddingChatting from '../../components/Bid/BiddingChatting';
import useSocketOnEnter from '../../hooks/Bid/useSocketOnEnter';
import BiddingPrice from '../../components/Bid/BiddingPrice';
import BiddingRaise from '../../components/Bid/BiddingRaise';
import useBidUpdate from '../../hooks/Bid/useBidUpdate';
import usePriceOnEnter from '../../hooks/Bid/usePriceOnEnter';
import BiddingInfo from '../../components/Bid/BiddingInfo';
import BiddingItemList from '../../components/Bid/BiddingItemList';

function Bid() {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const { auctionId, itemId } = useParams();
  const { socket, isConnected } = useSocketOnEnter({
    auctionId,
    itemId,
  });
  const { currentPrice, bidder } = useBidUpdate({ socket });
  const originalPrice = usePriceOnEnter({ socket });

  if (!isConnected) {
    return (
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box height="100vh" overflow="hidden">
      <Flex
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
          <Suspense fallback={<Spinner />}>
            <BiddingStream />
          </Suspense>

          <BiddingRaise
            open={open}
            setOpen={setOpen}
            originalPrice={originalPrice}
            currentPrice={currentPrice}
            socket={socket}
          />
          <BiddingInfo infoOpen={infoOpen} setInfoOpen={setInfoOpen} />
          <BiddingItemList itemOpen={itemOpen} setItemOpen={setItemOpen} />
          <Box position="absolute" top={0} left={0}>
            <BiddingPrice
              originalPrice={originalPrice}
              currentPrice={currentPrice}
            />
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
            bgGradient="linear(to-t, #141517, transparent)"
            height="40%"
            width="100%"
            position="absolute"
            bottom={0}
            left={0}
          >
            <BiddingChatting
              bidder={bidder}
              currentPrice={currentPrice}
              socket={socket}
            />
          </Box>
        </Container>
      </Flex>
    </Box>
  );
}

export default Bid;
