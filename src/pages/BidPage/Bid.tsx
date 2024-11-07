import {
  Box,
  Container,
  Flex,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdOutlineInfo } from 'react-icons/md';
import { keyframes } from '@emotion/react';
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
import { conteffi } from '../../App';
import Winner from '../../assets/images/winner.png';
import Cry from '../../assets/images/cry.png';
import useAuthStore from '../../store/UserAuthStore';

function Bid() {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [openReady, setOpenReady] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const { auctionId } = useParams();
  const { socket, isConnected, initialInfo } = useSocketOnEnter({
    auctionId,
  });
  const { currentPrice, bidder, setCurrentPrice } = useBidUpdate({ socket });
  const { sellerId, receievedItemId, receievedItemPrice, status, winnerInfo } =
    useReceiveStart({
      socket,
    });
  const { data, error, isPending } = useAuctionDetail();
  const user = useAuthStore((state) => state.user);

  console.log('sellerId', sellerId);

  const blinkAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

  const handleConffeti = () => {
    conteffi.addConfetti({
      confettiColors: [
        '#ff0a54',
        '#ff477e',
        '#ff7096',
        '#ff85a1',
        '#fbb1bd',
        '#f9bec7',
      ],
      confettiRadius: 5,
      confettiNumber: 500,
    });
  };

  const handleSadConffeti = () => {
    conteffi.addConfetti({
      emojis: ['😢', '🥲', '😭', '🥺'],
      emojiSize: 80,
      confettiNumber: 30,
    });
  };

  useEffect(() => {
    if (!initialInfo) return;

    initialInfo.bidPrice = 0;
    setCurrentPrice(0);
    console.log('한번 초기화 갈길게요?', currentPrice);
  }, [receievedItemId]);

  useEffect(() => {
    if (status === 'END') {
      setOpenResult(true);
      setOpen(false);
      setInfoOpen(false);
      setItemOpen(false);
      if (winnerInfo?.name) {
        handleConffeti();
      }
      if (!winnerInfo?.name) {
        handleSadConffeti();
      }
    } else if (status === 'START') {
      setOpenReady(false);
    } else if (status === 'READY') {
      setOpenResult(false);
      setOpenReady(true);
    }
  }, [status]);

  console.log('판매자', data);

  useEffect(() => {
    setIsOwner(data?.readUser.isOwner && sellerId === user?.id);
    console.log('판매자이신가요 당신?', isOwner);
  }, [sellerId]);

  if (isPending) {
    return <div>Loading..</div>;
  }

  if (error) {
    console.log(error);
  }

  console.log('winnerInfo', winnerInfo);

  console.log(isOwner);

  if (!isConnected || !initialInfo) {
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
    <Box
      position="relative"
      width="100%"
      height="calc(var(--vh, 1vh) * 100)"
      overflow="hidden"
    >
      <SpringModal p="" isOpen={openResult} setIsOpen={setOpenResult}>
        <VStack
          alignItems="center"
          justifyContent="space-evenly"
          bg="#222222"
          height="calc(var(--vh, 1vh) * 100)"
          width="100%"
          color="white"
        >
          {winnerInfo?.name ? (
            <VStack
              alignItems="center"
              height="50%"
              gap={3}
              justifyContent="space-between"
            >
              <Text fontWeight="700" fontSize={{ base: '16px', sm: '30px' }}>
                축하합니다 !🥳
              </Text>
              <Text>팽팽한 경쟁을 뚫고 낙찰 되셨습니다!</Text>
              <Image width={{ base: '150px', sm: '200px' }} src={Winner} />
              <HStack>
                <Text
                  fontSize={{ base: '16px', sm: '20px' }}
                  color="#886CB5"
                  fontWeight="700"
                >
                  {winnerInfo?.name} 님이
                </Text>
                <Text>{winnerInfo?.bidPrice} </Text>
                <Text>크레딧에</Text>
              </HStack>
              <Text fontSize={{ base: '18px', sm: '20px' }} color="#FF8C00">
                {winnerInfo?.title}
              </Text>
              <Text>낙찰 받으셨습니다!</Text>
            </VStack>
          ) : (
            <VStack height="70%" justifyContent="space-between">
              <Text fontWeight="700" fontSize={{ base: '16px', sm: '30px' }}>
                입찰자가 없습니다...🥲
              </Text>
              <HStack fontSize={{ base: '17px', sm: '18px' }}>
                <Text fontWeight="700" color="#A60029">
                  누구도
                </Text>
                <Text> 입찰 하지 않았습니다..</Text>
              </HStack>
              <Image width={{ base: '90px', sm: '200px' }} src={Cry} />
              <HStack fontSize={{ base: '18px', sm: '20px' }}>
                <Text fontWeight="700" color="#F1D849">
                  판매자님
                </Text>
                <Text>힘내세요..</Text>
              </HStack>
              <Text fontSize={{ base: '18px', sm: '20px' }} color="#FF8C00">
                {winnerInfo?.title}
              </Text>
              <Text>판매자님께 돌려드릴게요..</Text>
            </VStack>
          )}
          <Box
            fontSize={{ base: '16px', sm: '20px' }}
            animation={`${blinkAnimation} 1.5s ease-in-out infinite`}
          >
            <Text>잠시 후 다음 아이템 경매가 시작 됩니다..</Text>
          </Box>
        </VStack>
      </SpringModal>
      <SpringModal p="" isOpen={openReady} setIsOpen={setOpenReady}>
        <VStack
          alignItems="center"
          justifyContent="space-evenly"
          bg="#222222"
          height="calc(var(--vh, 1vh) * 100)"
          width="100%"
          color="white"
        >
          <VStack
            alignItems="center"
            height="50%"
            gap={3}
            justifyContent="space-between"
          >
            <Text>다음 경매를 준비 중 이예요!</Text>
            <Text
              animation={`${blinkAnimation} 1.5s ease-in-out infinite`}
              fontWeight="700"
              fontSize={{ base: '150px', sm: '200px' }}
            >
              🙏
            </Text>
            <HStack>
              <Text
                fontSize={{ base: '16px', sm: '20px' }}
                color="#886CB5"
                fontWeight="700"
              >
                잠시만
              </Text>
              <Text>기다려 주시면 금방 넘어갈게요!</Text>
            </HStack>
          </VStack>

          <Box
            fontSize={{ base: '16px', sm: '20px' }}
            animation={`${blinkAnimation} 1.5s ease-in-out infinite`}
          >
            <Text>곧 다음 아이템 경매가 시작 됩니다..</Text>
          </Box>
        </VStack>
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
