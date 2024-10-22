import {
  Box,
  Heading,
  Image,
  Text,
  Stack,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function BidItem() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedPercentage, setSelectedPercentage] = useState(null);
  const percentages = [5, 10, 20];

  //  현재가 처리 함수
  const handleBid = () => {
    if (selectedPercentage) {
      const newCurrentBid = Math.ceil(
        currentBid * (1 + selectedPercentage / 100)
      );
      setCurrentBid(newCurrentBid);
      console.log(newCurrentBid);
      // socket.emit('newCurrentBid', newCurrentBid); // 서버로 새로운 입찰가 전송
    }
  };

  const handlePercentage = (percentage) => {
    setSelectedPercentage(percentage);
  };

  return (
    <Box
      maxW={{ base: '100%', md: '445px' }}
      w={'full'}
      h={'100vh'}
      bg={useColorModeValue('#2F2F2F', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      fontFamily="SpoqaHanSansNeo"
      p={6}
      overflow={'hidden'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
    >
      <Box
        flex={1}
        h={{ base: '200px', md: '251px' }}
        bg={'gray.100'}
        mt={-6}
        mx={-6}
        pos={'relative'}
      >
        <Image
          src={'images/biditem.png'}
          alt="경매 물품"
          objectFit={'cover'}
          width={'100%'}
          height={'100%'}
        />
      </Box>
      <Box p={4} />
      <Text
        color={'white'}
        fontWeight={'bold'}
        fontSize={{ base: 'lg', md: 'xl' }}
        letterSpacing={1.1}
        textAlign="right"
      >
        현재가{' '}
        <Box as="span" color={'#EFDA19'}>
          {currentBid}
        </Box>
      </Text>
      <Stack>
        <Text
          color={'white'}
          fontWeight={'bold'}
          fontSize={{ base: 'sm', md: 'md' }}
          letterSpacing={1.1}
        >
          물품 제목
        </Text>
        <Heading
          color={'white'}
          fontSize={{ base: 'xl', md: '2xl' }}
          fontFamily={'body'}
        >
          {/* {data.title} */}
        </Heading>
        <Text
          color={'white'}
          fontWeight={'bold'}
          fontSize={{ base: 'sm', md: 'md' }}
          letterSpacing={1.1}
        >
          물품 상세 설명
        </Text>
        <Text color={'whiteAlpha.800'}>{/* {data.body} */}</Text>
        <Stack mt={'1rem'} width={'100%'} direction={'row'} spacing={4}>
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
          bg={'#AA8EBF'}
          color={'white'}
          height={'55.31px'}
          fontSize={'xl'}
          fontWeight={'bold'}
          letterSpacing={1.1}
          onClick={handleBid}
        >
          입찰하기
        </Button>
      </Stack>
    </Box>
  );
}
