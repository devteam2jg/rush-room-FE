import { Box, Container, Flex, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdOutlineInfo } from 'react-icons/md';
import { IoListCircleOutline } from 'react-icons/io5';
import BiddingStream from '../../components/Bid/BiddingStream';
import BiddingChatting from '../../components/Bid/BiddingChatting';
import useSocketOnEnter from '../../hooks/Bid/useSocketOnEnter';
import BiddingPrice from '../../components/Bid/BiddingPrice';
import BiddingRaise from '../../components/Bid/BiddingRaise';
import useBidUpdate from '../../hooks/Bid/useBidUpdate';
// import usePriceOnEnter from '../../hooks/Bid/usePriceOnEnter';
import BiddingInfo from '../../components/Bid/BiddingInfo';
import BiddingItemList from '../../components/Bid/BiddingItemList';
import useReceiveStart from '../../hooks/Bid/useReceiveStart';
import SpringModal from '../../components/Modal/SpringModal';
import useAuctionDetail from '../../hooks/useAuctionDetail';

function Bid() {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const { auctionId } = useParams();
  const { socket, isConnected, initialInfo } = useSocketOnEnter({
    auctionId,
  });
  const { currentPrice, bidder, setCurrentPrice } = useBidUpdate({ socket });
  const { receievedItemId, receievedItemPrice, status } = useReceiveStart({
    socket,
  });
  const { data, error, isPending } = useAuctionDetail();

  useEffect(() => {
    if (!initialInfo) return;

    initialInfo.bidPrice = 0;
    setCurrentPrice(0);
    console.log('한번 초기화 갈길게요?', currentPrice);
  }, [receievedItemId]);

  useEffect(() => {
    if (status === 'READY' || status === 'END') {
      setOpenResult(true);
    } else if (status === 'START') {
      setOpenResult(false);
    }
  }, [status]);

  if (isPending) {
    return <div>Loading..</div>;
  }

  if (error) {
    console.log(error);
  }

  const { isOwner } = data.readUser;

  console.log(isOwner);

  if (!isConnected || !initialInfo) {
    return (
      <Flex height="100vh" justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  console.log('조인할 때 다음 아이템 초기가', initialInfo.bidPrice);
  console.log('다음 아이템 현재가', currentPrice);
  console.log('다음 아이템 초기가', receievedItemPrice);

  const priceOfItem = Math.max(
    receievedItemPrice,
    initialInfo.bidPrice,
    currentPrice
  );

  console.log('그래서 결론적으로 주는 가격', priceOfItem);

  return (
    <Box position="relative" height="100vh" overflow="hidden">
      <SpringModal isOpen={openResult} setIsOpen={setOpenResult}>
        123
      </SpringModal>
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
            <BiddingStream isOwner={isOwner} />
          </Suspense>

          <BiddingRaise
            open={open}
            setOpen={setOpen}
            priceOfItem={priceOfItem}
            socket={socket}
          />
          <BiddingInfo
            itemId={receievedItemId}
            backupItemId={initialInfo.itemId}
            infoOpen={infoOpen}
            setInfoOpen={setInfoOpen}
          />
          <BiddingItemList itemOpen={itemOpen} setItemOpen={setItemOpen} />
          <Box position="absolute" top={0} left={0}>
            <BiddingPrice priceOfItem={priceOfItem} />
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
