import {
  Box,
  Heading,
  Image,
  Text,
  Stack,
  Button,
  createStandaloneToast,
} from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuctionDetail from '../hooks/useAuctionDetail';

export default function BidItem() {
  const socket = io('http://192.168.1.22:3000/auction-execute');
  const auctionId = 'auction123';
  const nav = useNavigate();
  const { toast } = createStandaloneToast();
  const { data, error, isPending } = useAuctionDetail();

  // 현재가 43000원
  const [currentBid, setCurrentBid] = useState<number>(0);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [selectedPercentage, setSelectedPercentage] = useState<number | null>(
    null
  );
  const percentages = [5, 10, 20];

  useEffect(() => {
    console.log(socket);
    // 소켓 연결 후 경매 방 참여
    socket.emit('join_auction', auctionId);

    socket.on('connect', () => {
      console.log('socket on -- ', socket.connected);
      // socket.emit('current_bid', data.items[0].startPrice); // 연결 여부 확인
    });

    // 서버에서 현재 최고가를 받아와 표시
    socket.on('current_bid', (currentBid: number) => {
      console.log('현재 입찰가: ', currentBid);
      setCurrentBid(currentBid);
    });

    // 입찰 성공 시, 새로운 최고가를 화면에 표시
    socket.on('bid_updated', (newBid: number) => {
      console.log('업데이트 입찰가: ', newBid);
      setCurrentBid(newBid);
    });

    // 입찰 에러 처리
    socket.on('bid_error', (message) => {
      alert(message);
    });
  }, []);

  //  현재가 처리 함수
  const handleBid = () => {
    if (selectedPercentage) {
      const newCurrentBid = Math.ceil(
        currentBid * (1 + selectedPercentage / 100)
      );
      socket.emit('new_bid', { auctionId, newCurrentBid }); // 서버로 새로운 입찰가 전송
      setCurrentBid(newCurrentBid);
      console.log('update bid ---', newCurrentBid);
      setSelectedPercentage(null);
      setSelectedButton(null);
    }
  };

  const handlePercentage = (percentage: number) => {
    setSelectedPercentage(percentage);
  };

  if (isPending) {
    return <div>Loading ...</div>;
  }

  if (error) {
    toast({
      title: '실패',
      description: `${error.message}`,
      status: 'error',
      variant: 'left-accent',
      duration: 3000,
      isClosable: true,
    });
    nav('/');
  }

  return (
    <Box
      maxW={{ base: '100%', md: '445px' }}
      w="full"
      h="100vh"
      bg="#2F2F2F"
      boxShadow="2xl"
      rounded="md"
      fontFamily="SpoqaHanSansNeo"
      p={6}
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        flex={1}
        h={{ base: '200px', md: '251px' }}
        bg="gray.100"
        mt={-6}
        mx={-6}
        pos="relative"
      >
        <Image
          src="/images/biditem.png"
          alt="경매 물품"
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
      <Box p={4} />
      <Text
        color="white"
        fontWeight="bold"
        fontSize={{ base: 'lg', md: 'xl' }}
        letterSpacing={1.1}
        textAlign="right"
      >
        현재가{' '}
        <Box as="span" color="#EFDA19">
          {currentBid}
        </Box>
        원
      </Text>
      <Stack>
        <Text
          color="white"
          fontWeight="bold"
          fontSize={{ base: 'sm', md: 'md' }}
          letterSpacing={1.1}
        >
          물품 제목
        </Text>
        <Heading
          fontSize={{ base: 'sm', md: 'md' }}
          fontFamily="body"
          color="whiteAlpha.800"
        >
          {data.items[0].title}
        </Heading>
        <Text
          color="white"
          fontWeight="bold"
          fontSize={{ base: 'sm', md: 'md' }}
          letterSpacing={1.1}
        >
          물품 상세 설명
        </Text>
        <Text color="whiteAlpha.800">담곰이를 담그면 담근곰</Text>
      </Stack>
      <Stack>
        <Stack mt="1rem" width="100%" direction="row" spacing={4}>
          {percentages.map((percentage: number) => (
            <Button
              key={percentage}
              flex={1}
              onClick={() => handlePercentage(percentage)}
              bg={selectedButton === percentage ? '#AA8EBF' : 'gray.200'}
              _hover={{ bg: '#AA8EBF' }}
              _active={{ bg: '#AA8EBF' }}
            >
              {percentage}%
            </Button>
          ))}
        </Stack>
        <Button
          mt={4}
          bg="#AA8EBF"
          color="white"
          height="55.31px"
          fontSize="xl"
          fontWeight="bold"
          letterSpacing={1.1}
          onClick={handleBid}
        >
          입찰하기
        </Button>
      </Stack>
    </Box>
  );
}
